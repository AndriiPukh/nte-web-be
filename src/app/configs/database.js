const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  mongoUrl:
    process.env.NODE_ENV === 'test'
      ? process.env.MONGO_URL_TEST
      : process.env.MONGO_URL,
};
