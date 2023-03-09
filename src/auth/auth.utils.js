const { check } = require('express-validator');
const {
  EMAIL_IS_EMPTY,
  USER_NAME_IS_EMPTY,
  EMAIL_IS_IN_WRONG_FORMAT,
  PASSWORD_IS_EMPTY,
  PASSWORD_LENGTH_MUST_BE_MORE_THAN_8,
} = require('./auth.constant');

const registerValidation = [
  check('userName')
    .exists()
    .withMessage(USER_NAME_IS_EMPTY)
    .bail()
    .isLength({ min: 3, max: 18 })
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

module.exports = {
  registerValidation,
};
