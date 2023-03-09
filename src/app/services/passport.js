const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { accessPrivateToken } = require('../configs/auth');
const { findUserByName } = require('../../auth/auth.model');

function cookiesExtractor(req) {
  return req && req.cookies.jwt ? req.cookies.jwt : null;
}
passport.use(
  new JwtStrategy({
    jwtFromRequest: cookiesExtractor,
    secretOrKey: accessPrivateToken,
  }),
  async (jwtPayload, done) => {
    try {
      if (Date.now() > jwtPayload.expires) return done('Token expired');
      const user = await findUserByName(jwtPayload.username);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

exports.verifyUser = passport.authenticate('jwt', { session: false }, () => {});

module.exports = passport;
