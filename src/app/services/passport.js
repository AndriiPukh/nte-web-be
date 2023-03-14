const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { accessSecret } = require('../configs');
const { findUserByName } = require('../../auth/auth.model');

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessSecret,
    },
    async (payload, done) => {
      try {
        if (Date.now() >= payload.exp * 1000)
          return done('Unauthorized! Access Token was expired!');
        const { userName } = JSON.parse(payload.user);
        const user = await findUserByName(userName);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

module.exports = passport;
