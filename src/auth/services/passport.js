const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { accessSecret } = require('../../app/configs');
const { findToken } = require('../auth.model');
const { AuthError } = require('../errors');

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessSecret,
      passReqToCallback: true,
    },
    async (req, payload, done) => {
      try {
        if (Date.now() >= payload.exp * 1000)
          throw new AuthError('UNAUTHORIZED');
        const { userId } = JSON.parse(payload.user);
        const accessToken = req.headers.authorization.replace('Bearer ', '');
        const token = await findToken(userId, accessToken);
        if (!token) throw new AuthError('UNAUTHORIZED');
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

const authenticate = passport.authenticate('jwt', { session: false });

module.exports = { passport, authenticate };
