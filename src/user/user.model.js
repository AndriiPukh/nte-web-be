const UserDB = require('./user.mongo');

async function findByUserId(_id) {
  return UserDB.findOne({ _id }, { __v: 0, password: 0 }).lean();
}
async function findByUserEmail(email) {
  return UserDB.findOne({ email }, { __v: 0 });
}
async function saveUser(user) {
  return UserDB.findOneAndUpdate(
    {
      email: user.email,
    },
    user,
    {
      upsert: true,
      new: true,
    }
  ).lean();
}

async function _getAllUsers(skip, limit) {
  return UserDB.find({ verified: true }, { __v: 0, _id: 0 })
    .skip(skip)
    .limit(limit)
    .lean();
}

async function deleteAll() {
  await UserDB.deleteMany({});
}

module.exports = {
  findByUserId,
  findByUserEmail,
  saveUser,
  _getAllUsers,
  deleteAll,
};
