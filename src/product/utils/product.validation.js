const { check } = require('express-validator');
const {
  validationMessages: {
    WRONG_LENGTH,
    REQUIRED,
    WRONG_FORMAT,
    WRONG_CATEGORY,
    WRONG_SUBCATEGORY,
    WRONG_LENGTH_TRADEMARK,
    WRONG_PRICE_FORMAT,
    WRONG_UNITS,
    WRONG_AMOUNT,
  },
} = require('../errors');
const { SUBCATEGORY, CATEGORY, UNITS } = require('../product.constant');

const productValidation = [
  check('title')
    .exists()
    .withMessage(REQUIRED)
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage(WRONG_LENGTH)
    .matches(/^[a-яё]+(?:[ -][a-яё]+)*$/i)
    .withMessage(WRONG_FORMAT),
  check('trademark')
    .exists()
    .withMessage(REQUIRED)
    .isString()
    .isLength({ min: 2, max: 12 })
    .withMessage(WRONG_LENGTH_TRADEMARK)
    .matches(/^[а-яА-ЯёЁa-zA-Z0-9\s]+$/)
    .withMessage(WRONG_FORMAT),
  check('category')
    .exists()
    .withMessage(REQUIRED)
    .isIn(CATEGORY)
    .withMessage(WRONG_CATEGORY),
  check('subCategory')
    .exists()
    .withMessage(REQUIRED)
    .isIn(SUBCATEGORY)
    .withMessage(WRONG_SUBCATEGORY),
  check('subCategory')
    .exists()
    .withMessage(REQUIRED)
    .isIn(SUBCATEGORY)
    .withMessage(WRONG_SUBCATEGORY),
  check('price').isNumeric().withMessage(WRONG_PRICE_FORMAT),
  check('unit')
    .exists()
    .withMessage(REQUIRED)
    .isIn(UNITS)
    .withMessage(WRONG_UNITS),
  check('amount')
    .exists()
    .withMessage(REQUIRED)
    .isNumeric()
    .withMessage(WRONG_AMOUNT),
];

module.exports = {
  productValidation,
};
