const { APIError } = require('../../app/errors');
const productErrors = require('../constants/productError.constants');

class ProductError extends APIError {
  constructor(errorName) {
    super(
      productErrors[errorName].name,
      productErrors[errorName].description,
      productErrors[errorName].httpCode
    );
  }
}

module.exports = ProductError;
