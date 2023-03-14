const { validationResult } = require('express-validator');
const FormattedError = require('../app/utils/errorFormatter');
const { authErrorFormatter, getToken } = require('./auth.utils');
const { refreshTokenTime } = require('../app/configs');
const {
  createNewUser,
  userFindByNameAndMatchingPassword,
  isUserExist,
} = require('./auth.model');
const {
  USER_EXISTS_ALREADY,
  WRONG_USERNAME_OR_PASSWORD,
} = require('./auth.constant');

async function httpRegister(req, res, next) {
  const errorsResult = validationResult(req).formatWith(({ msg }) => msg);
  try {
    if (!errorsResult.isEmpty()) {
      throw new FormattedError(authErrorFormatter(errorsResult.array()[0]));
    }
    const { userName, password, email } = req.body;
    const isExist = await isUserExist(userName, email);
    if (isExist !== null) {
      throw new FormattedError(authErrorFormatter(USER_EXISTS_ALREADY));
    }
    const user = await createNewUser(userName, password, email);
    const accessToken = getToken(user, true);
    const refreshToken = getToken(user, false);
    res
      .cookie('refresh_token', refreshToken, {
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
        .cookie('refresh_token', getToken(user, false), {
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

module.exports = {
  httpRegister,
  httpLogin,
};
