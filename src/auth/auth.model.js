const bcryptjs = require('bcryptjs');
const UserDB = require('./user.mongo');

async function createNewUser(userName, password, email) {
  const passwordHash = await bcryptjs.hash(password, 10);
  const user = new UserDB({ userName, password: passwordHash, email });
  await user.save();
}

async function findUserByName(useName) {
  return UserDB.findOne(useName);
}

module.exports = {
  createNewUser,
  findUserByName,
};
