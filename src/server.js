const http = require('http');
const app = require('./app');
const { port } = require('./app/configs/server');
const { mongoConnect } = require('./app/services/mongo');

async function startServer() {
  const server = http.createServer(app);
  await mongoConnect();
  server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

startServer().then();
