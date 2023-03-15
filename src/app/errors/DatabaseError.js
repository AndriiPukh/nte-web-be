const BaseError = require('./BaseError');
const { INTERNAL_SERVER } = require('./httpStatusCode');

class DatabaseError extends BaseError {
  constructor(schema) {
    super('DatabaseError', schema, INTERNAL_SERVER, false);
  }
}

module.exports = DatabaseError;
