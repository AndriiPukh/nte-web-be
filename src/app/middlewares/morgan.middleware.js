const morgan = require('morgan');
const logger = require('../utils/logger');
const { env } = require('../configs');

const stream = {
  // Use the http severity
  write: (message) => logger.http(message),
};

const skip = () => env !== 'development';

const morganMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

module.exports = morganMiddleware;
