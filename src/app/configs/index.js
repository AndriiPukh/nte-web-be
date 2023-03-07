const auth = require('./auth');
const db = require('./database');
const redis = require('./redis');
const server = require('./server');

module.exports = {
  ...server,
  ...auth,
  ...db,
  ...redis,
};
