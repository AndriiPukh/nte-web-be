const { validationResult } = require('express-validator');
const {
  getToken,
  verifyRefresh,
  passwordHash,
  verifyPassword,
} = require('./auth.utils');
const { refreshTokenTime } = require('../app/configs');
const { AuthValidationError, AuthError } = require('./errors');
const { findUserByAuth, addNewUser } = require('./auth.model');
const {
  USER_EXISTS_ALREADY,
  WRONG_USERNAME_OR_PASSWORD,
  REFRESH_TOKEN_IS_REQUIRED,
  REFRESH_TOKEN_IS_NOT_VERIFIED,
  REFRESH_TOKEN_IS_EXPIRED,
} = require('./errors/authErrors.constants');

async function httpCreateUser(req, res, next) {
  const validationErrors = validationResult(req).formatWith(({ msg }) => msg);
  try {
    if (!validationErrors.isEmpty()) {
      throw new AuthValidationError(validationErrors.errors);
    }
    const { userName, password, email } = req.body;
    const isExist = await findUserByAuth(userName, email);
    if (isExist !== null) {
      throw new AuthError(USER_EXISTS_ALREADY);
    }
    const hashedPassword = await passwordHash(password);
    const user = await addNewUser(userName, hashedPassword, email);
    const accessToken = getToken(user, true);
    const refreshToken = getToken(user.email, false);
    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: false,
        secure: false,
        sameSite: 'None',
        maxAge: refreshTokenTime,
      })
      .status(200)
      .json({ accessToken, user });
  } catch (err) {
    next(err);
  }
}

async function httpLogin(req, res, next) {
  try {
    const { userName, password } = req.body;
    const userDocument = await findUserByAuth(userName);
    if (userDocument === null) {
      throw new AuthError(WRONG_USERNAME_OR_PASSWORD);
    }
    const { password: hash, user } = userDocument;
    const isVerified = await verifyPassword(password, hash);
    if (!isVerified) {
      throw new AuthError(WRONG_USERNAME_OR_PASSWORD);
    } else {
      res
        .cookie('refreshToken', getToken(user.email, false), {
          httpOnly: false,
          secure: false,
          sameSite: 'None',
          maxAge: refreshTokenTime,
        })
        .status(200)
        .json({ user, accessToken: getToken(user, true) });
    }
  } catch (err) {
    next(err);
  }
}

async function httpGetRefresh(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new AuthError(REFRESH_TOKEN_IS_REQUIRED);

    const decoded = verifyRefresh(refreshToken);
    if (!decoded) {
      throw new AuthError(REFRESH_TOKEN_IS_EXPIRED);
    }
    const userDocument = await findUserByAuth('', decoded.email);

    if (!userDocument) {
      throw new AuthError(REFRESH_TOKEN_IS_NOT_VERIFIED);
    }
    const { user } = userDocument;
    res
      .cookie('refreshToken', getToken(user.email, false), {
        httpOnly: false,
        secure: false,
        sameSite: 'None',
        maxAge: refreshTokenTime,
      })
      .status(200)
      .send({ accessToken: getToken(user) });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  httpCreateUser,
  httpLogin,
  httpGetRefresh,
};
