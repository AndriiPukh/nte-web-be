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
    WRONG_COMMENT_LENGTH,
    WRONG_COMMENT_FORMAT,
  },
} = require('../errors');
const { SUBCATEGORY, CATEGORY, UNITS } = require('../product.constant');

const productCreateValidation = [
  check('title')
    .exists()
    .withMessage(REQUIRED)
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage(WRONG_LENGTH)
    .matches(/[а-яіїёЁА-Яa-zA-Z!0-9?%\-"',\s<>]+/)
    .withMessage(WRONG_FORMAT),
  check('trademark')
    .exists()
    .withMessage(REQUIRED)
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage(WRONG_LENGTH_TRADEMARK)
    .matches(/[а-яіїёЁА-Яa-zA-Z!0-9?%\-"',\s<>]+/)
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

const productUpdateValidation = [
  check('title')
    .optional()
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage(WRONG_LENGTH)
    .matches(/[а-яіїёЁА-Яa-zA-Z!0-9?%\-"',\s<>]+/)
    .withMessage(WRONG_FORMAT),
  check('trademark')
    .optional()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage(WRONG_LENGTH_TRADEMARK)
    .matches(/[а-яіїёЁА-Яa-zA-Z!0-9?%\-"',\s<>]+/)
    .withMessage(WRONG_FORMAT),
  check('category').optional().isIn(CATEGORY).withMessage(WRONG_CATEGORY),

  check('subCategory')
    .optional()
    .isIn(SUBCATEGORY)
    .withMessage(WRONG_SUBCATEGORY),
  check('price').optional().isNumeric().withMessage(WRONG_PRICE_FORMAT),
  check('unit').optional().isIn(UNITS).withMessage(WRONG_UNITS),
  check('amount').optional().isNumeric().withMessage(WRONG_AMOUNT),
];

const productComments = [
  check('text')
    .exists()
    .withMessage(REQUIRED)
    .isLength({ min: 3, max: 300 })
    .withMessage(WRONG_COMMENT_LENGTH)
    .matches(/[а-яіїёЁА-Яa-zA-Z!0-9?%\-"',\s<>]+/)
    .withMessage(WRONG_COMMENT_FORMAT),
];

module.exports = {
  productCreateValidation,
  productUpdateValidation,
  productComments,
};
