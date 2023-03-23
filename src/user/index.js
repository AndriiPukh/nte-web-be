const userRouter = require('./user.router');
const {
  findByUserId,
  findByUserEmail,
  saveUser,
  deleteUser,
  deleteAll,
} = require('./user.model');

module.exports = {
  UserModel: {
    findByUserEmail,
    findByUserId,
    saveUser,
    deleteUser,
    deleteAll,
  },
  userRouter,
};
