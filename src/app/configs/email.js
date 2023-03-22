require('dotenv').config();

module.exports = {
  host: process.env.NODE_MAILER_HOST,
  port: process.env.NODE_MAILER_PORT,
  auth: {
    user: process.env.NODE_MAILER_ACCOUNT,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
};
