module.exports = {
  SOME_THING_WENT_WRONG: {
    httpCode: 400,
    description: 'Some thing went wrong.',
  },
  WRONG_EMAIL_OR_PASSWORD: {
    httpCode: 400,
    description: 'The email or password you entered is incorrect.',
  },
  USER_EXISTS_ALREADY: {
    httpCode: 409,
    description: 'User already exist. Check your email to verify!',
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
  INVALID_LINK: {
    httpCode: 400,
    description: 'INVALID_LINK',
  },
  UNAUTHORIZED: {
    httpCode: 401,
    description: 'Unauthorized! Access Token not verified!',
  },
};
