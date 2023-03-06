const http = require('http');
const app = require('./app');
const { port } = require('./app/configs/server');

function startServer() {
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

startServer();
