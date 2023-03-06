const express = require('express');

const morganMiddleware = require('./middlewares/morgan.middleware');
const logger = require('./utils/logger');

const app = express();

app.use(morganMiddleware);
app.get('/api/status', (req, res) => {
  logger.info('Checking the API status: Everything is OK');
  res.status(200).send({
    status: 'UP',
    message: 'The API is up and running!',
  });
});

module.exports = app;
