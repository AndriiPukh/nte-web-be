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
  WRONG_PASSWORD: {
    statusCode: 422,
    message: 'The username or password you entered is incorrect.',
  },
  USER_EXISTS_ALREADY: {
    statusCode: 422,
    message: 'User with this name or email already exist.',
  },
  USER_DOES_NOT_EXIST: {
    statusCode: 422,
    message: 'The username or password you entered is incorrect.',
  },
  // TOKEN_IS_EMPTY: 'TOKEN_IS_EMPTY',
};
