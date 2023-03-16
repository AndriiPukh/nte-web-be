const http = require('http');
const app = require('./app');
const { port } = require('./app/configs/server');
const { mongoConnect } = require('./app/services/mongo');
const { redisConnect } = require('./app/services/redis');
const logger = require('./app/utils/logger');

async function startServer() {
  const server = http.createServer(app);
  await mongoConnect();
  await redisConnect();
  server.listen(port, () => {
    logger.info(`The server is running on the ${port} port...`);
  });
}

startServer().then();
