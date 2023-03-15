const { ValidationError } = require('../../app/errors');

class AuthValidationError extends ValidationError {
  constructor(errors) {
    super('Auth', errors);
  }
}

module.exports = AuthValidationError;
