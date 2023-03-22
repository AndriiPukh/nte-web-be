const { APIError } = require('../../app/errors');

class AuthError extends APIError {
  constructor({ description, httpCode }) {
    super('Auth', description, httpCode);
  }
}

module.exports = AuthError;
