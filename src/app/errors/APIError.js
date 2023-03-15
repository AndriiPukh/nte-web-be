const { INTERNAL_SERVER } = require('./httpStatusCode');
const BaseError = require('./BaseError');

class APIError extends BaseError {
  constructor(
    name,
    description,
    httpCode = INTERNAL_SERVER,
    isOperational = true
  ) {
    super(name, description, httpCode, isOperational);
  }
}

module.exports = APIError;
