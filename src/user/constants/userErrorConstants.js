module.exports = {
  FORBIDDEN: {
    name: 'Permission',
    httpCode: 403,
    description: 'You do not have access to read/edit/remove this resource.',
  },
  NOT_FOUND: {
    name: 'User',
    httpCode: 404,
    description: 'User not found!',
  },
  INVALID_ID: {
    name: 'User',
    httpCode: 400,
    description: 'Invalid user ID format!',
  },
};
