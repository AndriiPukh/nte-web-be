const authRouter = require('./auth.router');
const { findTokenByUserId } = require('./auth.model');

module.exports = {
  authRouter,
  AuthModel: {
    findTokenByUserId,
  },
};
