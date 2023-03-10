const logger = require('../utils/logger');

function errorResponder(err, req, res, _) {
  logger.error(err);
  if (err.isCustomError) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send(err);
  }
}

module.exports = errorResponder;
