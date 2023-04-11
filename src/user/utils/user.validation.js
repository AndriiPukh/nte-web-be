const { check } = require('express-validator');
const {
  validationMessages: {
    INVALID_DATE_FORMAT,
    WRONG_LENGTH,
    WRONG_NAME_FORMAT,
    WRONG_LAST_NAME_FORMAT,
  },
} = require('../errors');

const userValidation = [
  check('birthDate').isISO8601().toDate().withMessage(INVALID_DATE_FORMAT),
  check('firstName')
    .exists({ checkNull: false })
    .isString()
    .isLength({ min: 3, max: 12 })
    .withMessage(WRONG_LENGTH)
    .matches(/^[А-Яа-яіёЁA-Za-z]+$/)
    .withMessage(WRONG_NAME_FORMAT),
  check('lastName')
    .exists({ checkNull: false })
    .isString()
    .isLength({ min: 3, max: 12 })
    .withMessage(WRONG_LENGTH)
    .matches(/^[А-Яа-яіёЁA-Za-z]+$/)
    .withMessage(WRONG_LAST_NAME_FORMAT),
];
module.exports = userValidation;
