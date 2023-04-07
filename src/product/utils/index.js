const {
  productCreateValidation,
  productUpdateValidation,
  productComments,
} = require('./productValidation');
const normalizeFields = require('./normalizeFields');
const checkPermission = require('./checkPermission');

module.exports = {
  validation: {
    productCreateValidation,
    productUpdateValidation,
    productComments,
  },
  normalizeFields,
  checkPermission,
};
