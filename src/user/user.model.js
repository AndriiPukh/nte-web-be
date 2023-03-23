const UserDB = require('./user.mongo');
const DatabaseError = require('../app/errors/DatabaseError');

async function findByUserId(_id) {
  try {
    return UserDB.findOne({ _id }, { __v: 0, password: 0 }).lean();
  } catch (err) {
    throw new DatabaseError('User', err.message, err);
  }
}
async function findByUserEmail(email) {
  return UserDB.findOne({ email }, { __v: 0 });
}
async function saveUser(user, id = null) {
  const filter = {};
  if (id) {
    filter._id = id;
  } else {
    filter.email = user.email;
  }
  return UserDB.findOneAndUpdate(filter, user, {
    upsert: true,
    new: true,
    fields: {
      __v: 0,
      password: 0,
    },
  }).lean();
}

async function _getAllUsers(skip, limit) {
  return UserDB.find({ verified: true }, { __v: 0, _id: 0, password: 0 })
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
