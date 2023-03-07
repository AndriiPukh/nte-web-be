const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const { accessPrivateToken } = require('../configs/auth');
const { findUserByName } = require('../../auth/auth.model');

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: accessPrivateToken,
  }),
  async (jwtPayload, done) => {
    try {
      if (Date.now() > jwtPayload.expires) return done('Token expired');
      const user = await findUserByName({ useName: jwtPayload.username });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

module.exports = passport;
