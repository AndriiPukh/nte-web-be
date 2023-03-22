const auth = require('./auth');
const db = require('./database');
const redis = require('./redis');
const server = require('./server');
const session = require('./session');
const httpStatusCode = require('./httpStatusCode');
const swagger = require('./swagger');
const storage = require('./storage');
const email = require('./email');

module.exports = {
  ...server,
  ...auth,
  ...db,
  ...redis,
  ...session,
  statusCode: httpStatusCode,
  swagger,
  storage,
  email,
};
