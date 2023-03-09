require('dotenv').config();
const { env } = require('./server');

const HALF_HOUR = 1000 * 60 * 30;

module.exports = {
  SESSION_OPTIONS: {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: +HALF_HOUR,
      secure: env === 'production',
      sameSite: true,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
  },
};
