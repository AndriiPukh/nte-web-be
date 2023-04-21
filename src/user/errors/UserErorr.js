const APIError = require('../../app/errors/APIError');
const userErrors = require('../constants/userErrorConstants');

class UserError extends APIError {
  constructor(errorName) {
    super(
      userErrors[errorName].name,
      userErrors[errorName].description,
      userErrors[errorName].httpCode
    );
  }
}

module.exports = UserError;
