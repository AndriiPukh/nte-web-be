const { check } = require('express-validator');
const jwt = require('jsonwebtoken');

const { TokenExpiredError } = jwt;
const bcryptjs = require('bcryptjs');
const {
  EMAIL_IS_EMPTY,
  USER_NAME_IS_EMPTY,
  EMAIL_IS_IN_WRONG_FORMAT,
  PASSWORD_IS_EMPTY,
  PASSWORD_LENGTH_MUST_BE_MORE_THAN_8,
  USER_NAME_LENGTH,
} = require('./errors/validationError.constant');
const {
  accessSecret,
  accessTokenTime,
  refreshTokenTime,
  refreshSecret,
} = require('../app/configs');

const registerValidation = [
  check('userName')
    .exists()
    .withMessage(USER_NAME_IS_EMPTY)
    .isLength({ min: 3, max: 18 })
    .withMessage(USER_NAME_LENGTH),
  check('email')
    .exists()
    .withMessage(EMAIL_IS_EMPTY)
    .isEmail()
    .withMessage(EMAIL_IS_IN_WRONG_FORMAT),
  check('password')
    .exists()
    .withMessage(PASSWORD_IS_EMPTY)
    .isLength({ min: 8 })
    .withMessage(PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
];

function getToken(user, isAccess = true) {
  const secret = isAccess ? accessSecret : refreshSecret;
  const time = isAccess ? accessTokenTime : refreshTokenTime;
  const tokenObj = {};
  if (typeof user !== 'string') {
    tokenObj.user = JSON.stringify(user);
  } else {
    tokenObj.email = user;
  }
  return jwt.sign(tokenObj, secret, {
    expiresIn: time,
  });
}

function verifyRefresh(token) {
  return jwt.verify(token, refreshSecret, {}, (err, decode) => {
    if (err instanceof TokenExpiredError) {
      return null;
    }
    return decode;
  });
}

async function passwordHash(password) {
  return bcryptjs.hash(password, 10);
}

async function verifyPassword(password, hashedPassword) {
  return bcryptjs.compare(password, hashedPassword);
}

module.exports = {
  registerValidation,
  getToken,
  verifyRefresh,
  passwordHash,
  verifyPassword,
};
