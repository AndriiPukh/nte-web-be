const { check } = require('express-validator');
const { UNITS } = require('../../product/constants/product.constant');
const {
  validationMessages: {
    REQUIRED,
    WRONG_FORMAT,
    WRONG_LENGTH,
    WRONG_DESCRIPTION_LENGTH,
    WRONG_AMOUNT,
    WRONG_UNITS,
  },
} = require('../errors');

const newRecipeValidation = [
  check('title')
    .exists()
    .withMessage(REQUIRED)
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage(WRONG_LENGTH)
    .matches(/[а-яіїёЁА-Яa-zA-Z!0-9?%\-"',\s<>]+/)
    .withMessage(WRONG_FORMAT),
  check('description')
    .exists()
    .withMessage(REQUIRED)
    .isString()
    .isLength({ min: 3, max: 900 })
    .withMessage(WRONG_DESCRIPTION_LENGTH)
    .matches(/[а-яіїёЁА-Яa-zA-Z0-9!?%`\-"',.\s]+/)
    .withMessage(WRONG_FORMAT),
  check('ingredients.*.title')
    .exists()
    .withMessage(REQUIRED)
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage(WRONG_LENGTH)
    .matches(/[а-яіїёЁА-Яa-zA-Z!0-9?%\-"',\s<>]+/)
    .withMessage(WRONG_FORMAT),
  check('ingredients.*.amount')
    .exists()
    .withMessage(REQUIRED)
    .isNumeric()
    .withMessage(WRONG_AMOUNT),
  check('ingredients.*.unit')
    .exists()
    .withMessage(REQUIRED)
    .isIn(UNITS)
    .withMessage(WRONG_UNITS),
];

module.exports = {
  newRecipeValidation,
};
