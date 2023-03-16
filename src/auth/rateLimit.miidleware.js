const { RateLimiterRedis } = require('rate-limiter-flexible');
const { redisClient } = require('../app/services/redis');
const {
  maxConsecutiveFailsByUserNameAndIP,
  maxWrongAttemptsByIPerDay,
} = require('../app/configs');

const limiterSlowBruteByIP = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'login_fail_ip_per_day',
  points: maxWrongAttemptsByIPerDay,
  duration: 86400,
  blockDuration: 86400,
});

const limiterConsecutiveFailsByUserNameAndIP = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'login_fail_consecutive_user_name_and_ip',
  points: maxConsecutiveFailsByUserNameAndIP,
  duration: 3600,
  blockDuration: 3600,
});

const getUserNameIPKey = (userName, ip) => `${userName}_${ip}`;

async function loginRateLimit(req, res, next) {
  const ipAddr = req.ip;
  const userNameIPKey = getUserNameIPKey(req.body.userName, ipAddr);
  const [resUserNameAndIP, resSlowByIP] = await Promise.all([
    limiterConsecutiveFailsByUserNameAndIP.get(userNameIPKey),
    limiterSlowBruteByIP.get(ipAddr),
  ]);
  let retrySecs = 0;

  if (
    resSlowByIP !== null &&
    resSlowByIP.consumedPoints > maxWrongAttemptsByIPerDay
  ) {
    retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
  } else if (
    resUserNameAndIP !== null &&
    resUserNameAndIP.consumedPoints > maxConsecutiveFailsByUserNameAndIP
  ) {
    retrySecs = Math.round(resUserNameAndIP.msBeforeNext / 1000) || 1;
  }

  if (retrySecs > 0) {
    res.set('Retry-After', String(retrySecs));
    res
      .status(429)
      .send(`Too many requests. Retry after ${retrySecs} seconds.`);
  } else {
    next();
  }
}

module.exports = {
  loginRateLimit,
  limiterSlowBruteByIP,
  limiterConsecutiveFailsByUserNameAndIP,
};
