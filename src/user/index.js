const {
  findByUserId,
  findByUserEmail,
  saveUser,
  deleteAll,
} = require('./user.model');

module.exports = {
  UserModel: {
    findByUserEmail,
    findByUserId,
    saveUser,
    deleteAll,
  },
};
