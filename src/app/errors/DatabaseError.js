const BaseError = require('./BaseError');
const { statusCode } = require('../configs');

class DatabaseError extends BaseError {
  constructor(schema, description) {
    super(
      'DatabaseError',
      `${schema}: ${description}`,
      statusCode.INTERNAL_SERVER,
      false
    );
  }
}

module.exports = DatabaseError;
