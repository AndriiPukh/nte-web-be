const bcryptjs = require('bcryptjs');
const UserDB = require('./user.mongo');

async function findUserByName(userName) {
  return UserDB.findOne({ userName }, { __v: 0, password: 0 });
}

async function isUserExist(userName, email) {
  return UserDB.findOne(
    {
      $or: [{ userName }, { email }],
    },
    { __v: 0, password: 0 }
  );
}
async function createNewUser(userName, password, email) {
  const passwordHash = await bcryptjs.hash(password, 10);
  const newUser = new UserDB({ userName, password: passwordHash, email });
  await newUser.save();
  return findUserByName(userName);
}

async function userFindByNameAndMatchingPassword(userName, password) {
  const userData = await UserDB.findOne({ userName }, { __v: 0 });
  if (!userData) {
    return null;
  }
  const {
    _doc: { password: hashedPassword, ...user },
  } = userData;
  const isMatched = await bcryptjs.compare(password, hashedPassword);
  if (!isMatched) {
    return null;
  }
  return user;
}

module.exports = {
  createNewUser,
  findUserByName,
  userFindByNameAndMatchingPassword,
  isUserExist,
};
