const { APIError } = require('../../app/errors');
const authErrors = require('./authErrors.constants');

class AuthError extends APIError {
  constructor(errorName) {
    super(
      'Auth',
      authErrors[errorName].description,
      authErrors[errorName].httpCode
    );
  }
}

module.exports = AuthError;
