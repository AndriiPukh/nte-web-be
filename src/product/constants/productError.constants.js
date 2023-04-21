module.exports = {
  FORBIDDEN: {
    name: 'Permission',
    httpCode: 403,
    description: 'You do not have access to edit/remove this resource.',
  },
  NOT_FOUND: {
    name: 'Product',
    httpCode: 404,
    description: 'Product not found!',
  },
  INVALID_ID: {
    name: 'Product',
    httpCode: 400,
    description: 'Incorrect product ID format!',
  },
  COMMENT_NOT_FOUND: {
    name: 'Product',
    httpCode: 404,
    description: 'Comment not found!',
  },
};
