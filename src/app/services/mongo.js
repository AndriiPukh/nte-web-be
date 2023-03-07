const mongoose = require('mongoose');
const { dbName, dbPassword, dbUser } = require('../configs');

const MONGO_URL = `mongodb+srv://${dbUser}:${dbPassword}@${dbName}/?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('strictQuery', false);

// TODO - needed for jest
// async function mongoDisconnect() {
//   await mongoose.disconnect();
// }

module.exports = {
  MONGO_URL,
  mongoose,
};
