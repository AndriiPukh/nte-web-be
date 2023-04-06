const AuthError = require('./authError');
const authMessages = require('./authErrors.constants');
const authValidationMessages = require('./validationError.constant');
const AppErrors = require('../../app/errors');

module.exports = {
  ...authMessages,
  ...authValidationMessages,
  AuthError,
  ...AppErrors,
};
