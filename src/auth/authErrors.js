module.exports = {
  EMAIL_IS_EMPTY: {
    status: 400,
    message: 'Email is required.',
  },
  PASSWORD_IS_EMPTY: {
    status: 400,
    message: 'Password is required.',
  },
  PASSWORD_LENGTH_MUST_BE_MORE_THAN_8: {
    status: 400,
    message: 'The password must be more than 8 characters long.',
  },
  WRONG_PASSWORD: {
    status: 422,
    message: 'The username or password you entered is incorrect.',
  },
  SOME_THING_WENT_WRONG: {
    status: 400,
    message: 'Some thing went wrong.',
  },
  USER_EXISTS_ALREADY: {
    status: 422,
    message: 'User with this name or email already exist.',
  },
  USER_DOES_NOT_EXIST: {
    status: 422,
    message: 'The username or password you entered is incorrect.',
  },
  // TOKEN_IS_EMPTY: 'TOKEN_IS_EMPTY',
  EMAIL_IS_IN_WRONG_FORMAT: {
    status: 400,
    message: 'Email is wrong format.',
  },
};
