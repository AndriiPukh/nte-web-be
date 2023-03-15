const UserDB = require('./user.mongo');
const { DatabaseError } = require('./errors');

async function findUserByAuth(userName, email = '') {
  try {
    const userDocument = await UserDB.findOne(
      {
        $or: [{ userName }, { email }],
      },
      { __v: 0 }
    );

    if (!userDocument) {
      return null;
    }

    const {
      _doc: { password: hash, _v: _, ...userData },
    } = userDocument;
    return { password: hash, user: userData };
  } catch (err) {
    throw new DatabaseError('User', err);
  }
}
async function addNewUser(userName, password, email) {
  try {
    const newUser = new UserDB({ userName, password, email });
    // TODO check
    const {
      _doc: { password: hash, __v: _, ...user },
    } = await newUser.save();
    return user;
  } catch (err) {
    throw new DatabaseError('User', err);
  }
}

module.exports = {
  findUserByAuth,
  addNewUser,
};
