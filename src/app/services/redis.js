const { createClient } = require('redis');
const logger = require('../utils/logger');
const { redisHost, redisPort } = require('../configs');

const redisUrl = `${redisHost}:${redisPort}`;
const redisClient = createClient({
  url: redisUrl,
});

async function redisConnect() {
  try {
    await redisClient.connect();
    logger.info('Redis client connected');
  } catch (err) {
    logger.error(err.message);
    setTimeout(redisConnect, 5000);
  }
}
module.exports = { redisConnect };
