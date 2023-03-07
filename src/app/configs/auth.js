const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  accessPrivateToken: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenExpireIn: 15,
  refreshTokenExpireIn: 99,
};
