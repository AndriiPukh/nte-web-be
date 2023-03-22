const dotenv = require('dotenv');

dotenv.config();
const MINUTES = process.env.RATE_LIMIT_MINUTES * 60 * 1000; // 15 minutes

module.exports = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  sentryDSN: process.env.SENTRY_DSN,
  maxRequestPerWindow: process.env.RATE_LIMIT_REQUESTS,
  windowMs: MINUTES,
  baseUrl: process.env.BASE_URL,
};
