const {
  productCreateValidation,
  productUpdateValidation,
  productComments,
  productFilterParams,
  productMultipleUpdates,
} = require('./productValidation');
const normalizeFields = require('./normalizeFields');
const checkPermission = require('./checkPermission');

module.exports = {
  validation: {
    productCreateValidation,
    productUpdateValidation,
    productComments,
    productFilterParams,
    productMultipleUpdates,
  },
  normalizeFields,
  checkPermission,
};
