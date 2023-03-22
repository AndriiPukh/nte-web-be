const jwt = require('jsonwebtoken');
const {
  refreshSecret,
  accessSecret,
  accessTokenTime,
  refreshTokenTime,
} = require('../../app/configs');

const { TokenExpiredError } = jwt;

function verifyRefresh(token) {
  return jwt.verify(token, refreshSecret, {}, (err, decode) => {
    if (err instanceof TokenExpiredError) {
      return null;
    }
    return decode;
  });
}

function getToken(user, isAccess = true) {
  const secret = isAccess ? accessSecret : refreshSecret;
  const time = isAccess ? accessTokenTime : refreshTokenTime;
  const tokenObj = {};
  if (typeof user !== 'string') {
    tokenObj.user = JSON.stringify(user);
  } else {
    tokenObj.email = user;
  }
  return jwt.sign(tokenObj, secret, {
    expiresIn: time,
  });
}

module.exports = {
  verifyRefresh,
  getToken,
};
