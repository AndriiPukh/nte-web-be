const { statusCode } = require('../configs');
const BaseError = require('./BaseError');

class APIError extends BaseError {
  constructor(
    name,
    description,
    httpCode = statusCode.INTERNAL_SERVER,
    isOperational = true
  ) {
    super(name, description, httpCode, isOperational);
  }
}

module.exports = APIError;
