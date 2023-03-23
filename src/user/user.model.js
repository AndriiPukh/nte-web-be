const UserDB = require('./user.mongo');
const DatabaseError = require('../app/errors/DatabaseError');

async function findByUserId(id) {
  try {
    return UserDB.findById(id, { __v: 0, password: 0 }).lean();
  } catch (err) {
    throw new DatabaseError('User', err.message, err);
  }
}
async function findByUserEmail(email) {
  return UserDB.findOne({ email }, { __v: 0 }).lean();
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

async function getAllUsers(skip, limit) {
  return UserDB.find({ verified: true }, { __v: 0, password: 0 })
    .skip(skip)
    .limit(limit)
    .lean();
}

async function deleteUser(id) {
  await UserDB.findByIdAndDelete(id);
}

async function deleteAll() {
  await UserDB.deleteMany({});
}

module.exports = {
  findByUserId,
  findByUserEmail,
  saveUser,
  getAllUsers,
  deleteUser,
  deleteAll,
};
