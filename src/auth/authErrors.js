const { REFRESH_TOKEN_IS_EXPIRED } = require('./auth.constant');

module.exports = {
  USER_NAME_IS_EMPTY: {
    statusCode: 400,
    message: 'Username is required',
  },
  EMAIL_IS_EMPTY: {
    statusCode: 400,
    message: 'Email is required.',
  },
  EMAIL_IS_IN_WRONG_FORMAT: {
    statusCode: 400,
    message: 'Email is wrong format.',
  },
  PASSWORD_IS_EMPTY: {
    statusCode: 400,
    message: 'Password is required.',
  },
  PASSWORD_LENGTH_MUST_BE_MORE_THAN_8: {
    statusCode: 400,
    message: 'The password must be more than 8 characters long.',
  },
  USER_NAME_LENGTH: {
    statusCode: 400,
    message: 'Username must contain from 3 to 18 characters',
  },
  SOME_THING_WENT_WRONG: {
    statusCode: 400,
    message: 'Some thing went wrong.',
  },
  WRONG_USERNAME_OR_PASSWORD: {
    statusCode: 422,
    message: 'The username or password you entered is incorrect.',
  },
  USER_EXISTS_ALREADY: {
    statusCode: 422,
    message: 'User with this name or email already exist.',
  },
  REFRESH_TOKEN_IS_REQUIRED: {
    statusCode: 403,
    message: 'Refresh Token is required!',
  },
  REFRESH_TOKEN_IS_EXPIRED: {
    statusCode: 401,
    message: 'Refresh token was expired. Please make a new login request!',
  },
  REFRESH_TOKEN_IS_NOT_VERIFIED: {
    statusCode: 401,
    message: 'Unauthorized!',
  },
};