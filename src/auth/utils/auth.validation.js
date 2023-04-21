const { check } = require('express-validator');

const {
  EMAIL_IS_EMPTY,
  EMAIL_IS_IN_WRONG_FORMAT,
  PASSWORD_IS_EMPTY,
  PASSWORD_LENGTH_MUST_BE_MORE_THAN_8,
} = require('../constants/validationError.constant');

const registerValidation = [
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

module.exports = {
  registerValidation,
};
