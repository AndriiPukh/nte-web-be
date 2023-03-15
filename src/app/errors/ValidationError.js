const APIError = require('./APIError');
const { BAD_REQUEST } = require('./httpStatusCode');

class ValidationError extends APIError {
  constructor(name, errors) {
    super(`Validation:${name}`, 'Invalid fields', BAD_REQUEST);
    this.errors = errors.map(({ value, msg, param }) => ({
      [param]: `Value "${value}" is not valid! ${msg}`,
    }));
  }
}

module.exports = ValidationError;
