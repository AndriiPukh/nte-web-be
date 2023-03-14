const dotenv = require('dotenv');

const HALF_HOUR = '30m';
const TWENTY_FOUR_HOURS = '24h';

dotenv.config();
module.exports = {
  accessSecret: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenTime: process.env.ACCESS_TOKEN_EXPIRE_MILISECOND || HALF_HOUR,
  refreshSecret: process.env.REFRESH_TOKEN_PRIVATE_KEY,
  refreshTokenTime:
    process.env.REFRESH_TOKEN_EXPIRE_IN_MILISECOND || TWENTY_FOUR_HOURS,
};
