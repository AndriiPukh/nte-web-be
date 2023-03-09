const bcryptjs = require('bcryptjs');
const UserDB = require('./user.mongo');

async function findUserByName(userName) {
  return UserDB.findOne({ userName }, { __v: 0 });
}
async function createNewUser(userName, password, email) {
  const alreadyExist = await findUserByName(userName);
  if (alreadyExist) {
    throw new Error('Username already exist!');
  }
  // const salt = await bcryptjs.genSalt(10);
  const passwordHash = await bcryptjs.hash(password, 10);
  const user = new UserDB({ userName, password: passwordHash, email });
  await user.save();
}

async function userFindByNameAndMatchingPassword(userName, password) {
  const user = await findUserByName(userName);
  if (!user) {
    // Todo create error Handler
    throw new Error('User does not exist');
  }
  const isMatched = await bcryptjs.compare(password, user.password);
  console.log(isMatched);
  if (!isMatched) {
    throw new Error('wrong username/password or session expired');
  }
  return user;
}

module.exports = {
  createNewUser,
  findUserByName,
  userFindByNameAndMatchingPassword,
};
