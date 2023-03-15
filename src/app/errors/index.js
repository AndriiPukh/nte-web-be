const BaseError = require('./BaseError');
const APIError = require('./APIError');
const httpStatusCodes = require('./httpStatusCode');
const ValidationError = require('./ValidationError');
const DatabaseError = require('./DatabaseError');

module.exports = {
  ...httpStatusCodes,
  BaseError,
  APIError,
  ValidationError,
  DatabaseError,
};
