const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  redisPort: process.env.REDIS_PORT,
  redisHost: process.env.REDIS_HOST,
  redisUserName: process.env.REDIS_USER_NAME,
  redisPassword: process.env.REDIS_PASSWORD,
};
