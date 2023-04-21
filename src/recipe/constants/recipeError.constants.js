module.exports = {
  FORBIDDEN: {
    name: 'Permission',
    httpCode: 403,
    description: 'You do not have access to edit/remove this resource.',
  },
  NOT_FOUND: {
    name: 'Recipe',
    httpCode: 404,
    description: 'Recipe not found!',
  },
  INVALID_ID: {
    name: 'Recipe',
    httpCode: 400,
    description: 'Incorrect recipe ID format!',
  },
  COMMENT_NOT_FOUND: {
    name: 'Recipe',
    httpCode: 404,
    description: 'Comment not found!',
  },
};
