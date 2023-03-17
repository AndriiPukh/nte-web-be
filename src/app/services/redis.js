const { createClient } = require('redis');
const RedisStore = require('connect-redis').default;
const logger = require('../utils/logger');
const { redisHost, redisPort } = require('../configs');

const redisClient = createClient({
  socket: { host: redisHost, port: redisPort },
  legacyMode: true,
});
redisClient.on('ready', () => {
  logger.info('Redis connection ready!');
});
redisClient.on('error', (err) => {
  logger.fatal('Redis', err);
});

async function redisConnect() {
  await redisClient.connect();
}

async function redisDisconnect() {
  await redisClient.disconnect();
}

const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'nte-app',
});

module.exports = { redisStore, redisClient, redisConnect, redisDisconnect };
