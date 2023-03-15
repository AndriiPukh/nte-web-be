const { APIError } = require('../../app/errors');

class AuthError extends APIError {
  constructor({ httpCode, description }) {
    super('Auth', description, httpCode);
  }
}

module.exports = AuthError;
