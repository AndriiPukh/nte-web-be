const { createClient } = require('redis');
const RedisStore = require('connect-redis').default;
const logger = require('../utils/logger');
const { redisHost, redisPort } = require('../configs');

const redisClient = createClient({
  socket: { host: redisHost, port: redisPort },
  legacyMode: true,
});
redisClient.connect().catch((err) => logger.error(err));

const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'nte-app',
});

module.exports = { redisStore, redisClient };
