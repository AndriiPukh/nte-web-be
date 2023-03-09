const logger = require('../utils/logger');

function errorResponder(err, req, res, next) {
  logger.error(err);
  const status = err.status || 400;
  res.status(status).send(err.message);
  next();
}

module.exports = errorResponder;
