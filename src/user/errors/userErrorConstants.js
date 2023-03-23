module.exports = {
  FORBIDDEN: {
    name: 'Permission',
    httpCode: 403,
    description: 'You do not have access to edit this resource.',
  },
  NOT_FOUND: {
    name: 'UserError',
    httpCode: 404,
    description: 'User not found!',
  },
  INVALID_ID: {
    name: 'UserError',
    httpCode: 400,
    description: 'User id wrong format!',
  },
};
