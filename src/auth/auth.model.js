const bcryptjs = require('bcryptjs');
const UserDB = require('./user.mongo');

async function findUserByName(userName) {
  return UserDB.findOne({ userName }, { __v: 0, password: 0 });
}
async function isUserExist(userName, email) {
  const user = await UserDB.findOne(
    {
      $or: [{ userName }, { email }],
    },
    { __v: 0 }
  );
  return user;
}
async function createNewUser(userName, password, email) {
  const passwordHash = await bcryptjs.hash(password, 10);
  const newUser = new UserDB({ userName, password: passwordHash, email });
  await newUser.save();
  return findUserByName(userName);
}

async function userFindByNameAndMatchingPassword(userName, password) {
  const user = await findUserByName(userName);
  if (!user) {
    // Todo create error Handler
    throw new Error('User does not exist');
  }
  const isMatched = await bcryptjs.compare(password, user.password);
  if (!isMatched) {
    throw new Error('wrong username/password or session expired');
  }
  return user;
}

module.exports = {
  createNewUser,
  findUserByName,
  userFindByNameAndMatchingPassword,
  isUserExist,
};
