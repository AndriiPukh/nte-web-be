const { validationResult } = require('express-validator');
const {
  limiterSlowBruteByIP,
  limiterConsecutiveFailsByUserNameAndIP,
} = require('./middlewares/rateLimit');
const {
  jwt: { verifyRefresh, getToken },
  crypto: { verifyPassword, passwordHash },
  email: { sendEmail },
} = require('./utils');
const {
  refreshTokenTime,
  SESSION_OPTIONS,
  statusCode,
  baseUrl,
  port,
} = require('../app/configs');
const matchId = require('../app/utils/matchId');
const { AuthValidationError, AuthError } = require('./errors');
const UserError = require('../user/errors/UserErorr');
const { saveToken, findToken, deleteToken } = require('./auth.model');
const { UserModel } = require('../app/providers/mongoProvider');

async function httpCreateUser(req, res, next) {
  const validationErrors = validationResult(req).formatWith(({ msg }) => msg);
  try {
    if (!validationErrors.isEmpty()) {
      throw new AuthValidationError(validationErrors.errors);
    }
    const { password, email } = req.body;
    const isExist = await UserModel.findByUserEmail(email);
    if (isExist !== null) {
      throw new AuthError('USER_EXISTS_ALREADY');
    }
    const hashedPassword = await passwordHash(password);
    const { _id, role } = await UserModel.saveUser({
      password: hashedPassword,
      email,
    });
    const accessToken = getToken({ userId: _id, email, role }, true);
    await saveToken(_id, accessToken);
    const message = `${baseUrl}${port}/api/auth/verify/${_id}/${accessToken}`;
    await sendEmail(email, 'Verify Email', message);
    res.status(statusCode.CREATED).send({ status: 'NOT_VERIFIED', email });
  } catch (err) {
    next(err);
  }
}

async function httpSignIn(req, res, next) {
  try {
    const limitPromises = [limiterSlowBruteByIP.consume(req.ip)];
    const { email, password } = req.body;
    const userDocument = await UserModel.findByUserEmail(email);
    if (userDocument === null) {
      limitPromises.push(
        limiterConsecutiveFailsByUserNameAndIP.consume(`${email}_${req.ip}`)
      );
      await Promise.all(limitPromises);
      throw new AuthError('WRONG_EMAIL_OR_PASSWORD');
    } else if (!userDocument.verified) {
      res.status(statusCode.CREATED).json({ status: 'NOT_VERIFIED', email });
    }
    const { password: hash, _id, role } = userDocument;
    const isVerified = await verifyPassword(password, hash);
    if (!isVerified) {
      limitPromises.push(
        limiterConsecutiveFailsByUserNameAndIP.consume(`${email}_${req.ip}`)
      );
      await Promise.all(limitPromises);
      throw new AuthError('WRONG_EMAIL_OR_PASSWORD');
    } else {
      await limiterConsecutiveFailsByUserNameAndIP.delete(`${email}_${req.ip}`);
      await limiterSlowBruteByIP.delete(req.ip);
      const accessToken = getToken({ userId: _id, email, role }, true);
      await saveToken(_id, accessToken);
      res
        .cookie('refreshToken', getToken(email, false), {
          httpOnly: false,
          secure: false,
          sameSite: 'None',
          maxAge: refreshTokenTime,
        })
        .status(statusCode.OK)
        .json({ accessToken });
    }
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    } else {
      const timeOut = String(Math.round(err.msBeforeNext / 1000)) || 1;
      res.set('Retry-After', timeOut);
      res
        .status(statusCode.TOO_MANY_REQUESTS)
        .send(`Too many login attempts. Retry after ${timeOut} seconds`);
    }
  }
}

async function httpGetRefresh(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new AuthError('REFRESH_TOKEN_IS_REQUIRED');
    const decoded = verifyRefresh(refreshToken);
    if (!decoded) {
      throw new AuthError('REFRESH_TOKEN_IS_EXPIRED');
    }
    const userDocument = await UserModel.findByUserEmail(decoded.email);

    if (!userDocument) {
      throw new AuthError('REFRESH_TOKEN_IS_NOT_VERIFIED');
    }

    const { _id, email, role } = userDocument;
    const accessToken = getToken({
      userId: _id,
      email,
      role,
    });
    await saveToken(userDocument._id, accessToken);
    res
      .cookie('refreshToken', getToken(userDocument.email, false), {
        httpOnly: false,
        secure: false,
        sameSite: 'None',
        maxAge: refreshTokenTime,
      })
      .status(statusCode.OK)
      .json({ accessToken });
  } catch (err) {
    next(err);
  }
}

async function httpGetSignOut(req, res, next) {
  if (req.user) {
    const { userId } = JSON.parse(req.user);
    await deleteToken(userId);
  }
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    res.clearCookie(SESSION_OPTIONS.name);
    res.clearCookie('refreshToken');
    res.status(statusCode.NO_CONTENT).end();
  });
}

async function httpGetVerifyEmail(req, res, next) {
  try {
    const { id, token } = req.params;
    if (!matchId(id)) {
      throw new UserError('INVALID_ID');
    }
    const user = await UserModel.findByUserId(id);
    if (!user) throw new AuthError('INVALID_LINK');
    if (user.verified) {
      res.status(statusCode.OK).json({ status: 'VERIFIED' });
    }
    const accessToken = await findToken(id, token);
    if (!accessToken) {
      throw new AuthError('INVALID_LINK');
    }
    await UserModel.saveUser({ email: user.email, verified: true });
    res.status(statusCode.OK).json({ status: 'VERIFIED' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  httpCreateUser,
  httpSignIn,
  httpGetRefresh,
  httpGetLogout: httpGetSignOut,
  httpGetVerifyEmail,
};
