const logger = require('../utils/logger');
const BaseError = require('../errors/BaseError');
const { ValidationError } = require('../errors');

class ErrorHandler {
  async handleError(err, res) {
    if (err instanceof ValidationError) {
      await logger.error(`${err.name}:`, err.errors);
      return res.status(err.httpCode).send({ errors: err.errors });
    }
    await logger.error(`${err.name}: ${err.message}`, err);

    return res.status(err.httpCode).send({ error: err.message });
  }

  isTrustedError(err) {
    if (err instanceof BaseError) {
      return err.isOperational;
    }
    return false;
  }
}

module.exports = new ErrorHandler();
