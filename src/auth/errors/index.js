const AuthError = require('./AuthError');
const authMessages = require('../constants/authErrors.constants');
const authValidationMessages = require('../constants/validationError.constant');
const AppErrors = require('../../app/errors');

module.exports = {
  ...authMessages,
  ...authValidationMessages,
  AuthError,
  ...AppErrors,
};
