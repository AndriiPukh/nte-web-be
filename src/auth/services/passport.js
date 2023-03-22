const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { accessSecret } = require('../../app/configs');
const { findTokenByUserId } = require('../auth.model');
const { AuthError } = require('../errors');

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessSecret,
    },
    async (payload, done) => {
      try {
        if (Date.now() >= payload.exp * 1000)
          throw new AuthError({
            description: 'Unauthorized! Access Token not verified!',
            httpCode: 401,
          });
        const { userId } = JSON.parse(payload.user);
        const token = await findTokenByUserId(userId);
        if (!token)
          throw new AuthError({
            description: 'Unauthorized! Access Token not verified!',
            httpCode: 401,
          });
        return done(null, payload.user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
