module.exports = {
  SOME_THING_WENT_WRONG: {
    httpCode: 400,
    description: 'Some thing went wrong.',
  },
  WRONG_USERNAME_OR_PASSWORD: {
    httpCode: 400,
    description: 'The username or password you entered is incorrect.',
  },
  USER_EXISTS_ALREADY: {
    httpCode: 422,
    description: 'User with this name or email already exist.',
  },
  REFRESH_TOKEN_IS_REQUIRED: {
    httpCode: 403,
    description: 'Refresh Token is required!',
  },
  REFRESH_TOKEN_IS_EXPIRED: {
    httpCode: 401,
    description: 'Refresh token was expired. Please make a new login request!',
  },
  REFRESH_TOKEN_IS_NOT_VERIFIED: {
    httpCode: 401,
    description: 'Unauthorized!',
  },
};
