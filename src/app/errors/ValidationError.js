const APIError = require('./APIError');
const { statusCode } = require('../configs');

class ValidationError extends APIError {
  constructor(name, errors) {
    super(`Validation:${name}`, 'Invalid fields', statusCode.BAD_REQUEST);
    this.errors = errors.map(({ value, msg, param }) => ({
      [param]: `Value '${value}' - ${msg}`,
    }));
  }
}

module.exports = ValidationError;
