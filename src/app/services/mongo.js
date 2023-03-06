const mongoose = require('mongoose');
const { dbName, dbPassword, dbUser } = require('../configs/database');
const logger = require('../utils/logger');

const MONGO_URL = `mongodb+srv://${dbUser}:${dbPassword}@${dbName}/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connection.on('open', () => {
  logger.debug('MongoDB connection ready');
});

mongoose.connection.on('error', (error) => {
  logger.error(error);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

// TODO - needed for jest
// async function mongoDisconnect() {
//   await mongoose.disconnect();
// }

module.exports = {
  mongoConnect,
};
