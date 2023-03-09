const auth = require('./auth');
const db = require('./database');
const redis = require('./redis');
const server = require('./server');
const session = require('./session');

module.exports = {
  ...server,
  ...auth,
  ...db,
  ...redis,
  ...session,
};
