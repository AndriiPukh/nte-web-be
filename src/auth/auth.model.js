const AuthDB = require('./auth.mongo');

async function saveToken(userId, accessToken) {
  await AuthDB.findOneAndUpdate(
    { userId },
    { userId, accessToken },
    { upsert: true }
  ).lean();
}

async function findToken(userId, accessToken) {
  return AuthDB.findOne({ userId, accessToken }, { __v: 0, _id: 0 }).lean();
}

async function findTokenByUserId(userId) {
  return AuthDB.findOne({ userId }, { __v: 0, _id: 0 }).lean();
}

async function deleteToken(userId) {
  return AuthDB.findOneAndRemove({ userId });
}

module.exports = { saveToken, findToken, findTokenByUserId, deleteToken };
