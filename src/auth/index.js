const authRouter = require('./auth.router');
const UserDB = require('./user.mongo');

module.exports = {
  UserDB,
  authRouter,
};
