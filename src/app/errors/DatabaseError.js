const BaseError = require('./BaseError');
const { statusCode } = require('../configs');

class DatabaseError extends BaseError {
  constructor(schema) {
    super('DatabaseError', schema, statusCode.INTERNAL_SERVER, false);
  }
}

module.exports = DatabaseError;
