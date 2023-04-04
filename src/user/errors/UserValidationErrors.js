const { ValidationError } = require('../../app/errors');

class UserValidationErrors extends ValidationError {
  constructor(errors) {
    super('User', errors);
  }
}

module.exports = UserValidationErrors;
