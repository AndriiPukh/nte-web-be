const http = require('http');
const app = require('./app');
const { port } = require('./app/configs/server');
const { mongoose } = require('./app/services/mongo');
const logger = require('./app/utils/logger');

async function startServer() {
  const server = http.createServer(app);
  server.listen(port, () => {
    mongoose.connection
      .on('open', () => logger.info('🚀  MongoDB: Connection Succeeded'))
      .on('error', (err) => logger.error(err));
  });
}

startServer().then();
