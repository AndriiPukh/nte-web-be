const authRouter = require('./auth.router');
const { findTokenByUserId } = require('./auth.model');
const passport = require('./services/passport');

module.exports = {
  authRouter,
  AuthModel: {
    findTokenByUserId,
  },
  passport,
};
