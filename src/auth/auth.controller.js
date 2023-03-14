const { validationResult } = require('express-validator');
const FormattedError = require('../app/utils/errorFormatter');
const { authErrorFormatter, getToken, verifyRefresh } = require('./auth.utils');
const { refreshTokenTime } = require('../app/configs');
const {
  createNewUser,
  userFindByNameAndMatchingPassword,
  isUserExist,
} = require('./auth.model');
const {
  USER_EXISTS_ALREADY,
  WRONG_USERNAME_OR_PASSWORD,
  REFRESH_TOKEN_IS_REQUIRED,
  REFRESH_TOKEN_IS_NOT_VERIFIED,
  REFRESH_TOKEN_IS_EXPIRED,
} = require('./auth.constant');

async function httpRegister(req, res, next) {
  const errorsResult = validationResult(req).formatWith(({ msg }) => msg);
  try {
    if (!errorsResult.isEmpty()) {
      throw new FormattedError(authErrorFormatter(errorsResult.array()[0]));
    }
    const { userName, password, email } = req.body;
    console.log(email, 'Register');
    const isExist = await isUserExist(userName, email);
    console.log(isExist);
    if (isExist !== null) {
      throw new FormattedError(authErrorFormatter(USER_EXISTS_ALREADY));
    }
    const user = await createNewUser(userName, password, email);
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
      .json({ accessToken });
  } catch (err) {
    next(err);
  }
}

async function httpLogin(req, res, next) {
  try {
    const { userName, password } = req.body;
    const user = await userFindByNameAndMatchingPassword(userName, password);
    if (!user) {
      throw new FormattedError(authErrorFormatter(WRONG_USERNAME_OR_PASSWORD));
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
    if (!refreshToken) {
      throw FormattedError(authErrorFormatter(REFRESH_TOKEN_IS_REQUIRED));
    }
    const decoded = verifyRefresh(refreshToken);
    if (!decoded) {
      throw new FormattedError(authErrorFormatter(REFRESH_TOKEN_IS_EXPIRED));
    }
    const user = await isUserExist('', decoded.email);
    if (!user) {
      throw new FormattedError(
        authErrorFormatter(REFRESH_TOKEN_IS_NOT_VERIFIED)
      );
    }
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
  httpRegister,
  httpLogin,
  httpGetRefresh,
};
