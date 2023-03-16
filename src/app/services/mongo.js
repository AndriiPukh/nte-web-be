const mongoose = require('mongoose');
const { mongoUrl } = require('../configs');
const logger = require('../utils/logger');

mongoose.set('strictQuery', false);

mongoose.connection.on('open', () => {
  logger.info('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  logger.fatal(err);
});
async function mongoConnect() {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
