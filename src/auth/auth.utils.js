const { check } = require('express-validator');
const jwt = require('jsonwebtoken');
const {
  EMAIL_IS_EMPTY,
  USER_NAME_IS_EMPTY,
  EMAIL_IS_IN_WRONG_FORMAT,
  PASSWORD_IS_EMPTY,
  PASSWORD_LENGTH_MUST_BE_MORE_THAN_8,
  USER_NAME_LENGTH,
  SOME_THING_WENT_WRONG,
} = require('./auth.constant');
const authErrors = require('./authErrors');
const {
  accessSecret,
  accessTokenTime,
  refreshTokenTime,
  refreshSecret,
} = require('../app/configs');

function authErrorFormatter(errorName) {
  return authErrors[errorName] || authErrors[SOME_THING_WENT_WRONG];
}
const registerValidation = [
  check('userName')
    .exists()
    .withMessage(USER_NAME_IS_EMPTY)
    .bail()
    .isLength({ min: 3, max: 18 })
    .withMessage(USER_NAME_LENGTH)
    .bail(),
  check('email')
    .exists()
    .withMessage(EMAIL_IS_EMPTY)
    .bail()
    .isEmail()
    .withMessage(EMAIL_IS_IN_WRONG_FORMAT)
    .bail(),
  check('password')
    .exists()
    .withMessage(PASSWORD_IS_EMPTY)
    .bail()
    .isLength({ min: 8 })
    .withMessage(PASSWORD_LENGTH_MUST_BE_MORE_THAN_8)
    .bail(),
];

function getToken(user, isAccess = true) {
  const secret = isAccess ? accessSecret : refreshSecret;
  const time = isAccess ? accessTokenTime : refreshTokenTime;
  return jwt.sign({ user: JSON.stringify(user) }, secret, {
    expiresIn: time,
  });
}

module.exports = {
  registerValidation,
  authErrorFormatter,
  getToken,
};
