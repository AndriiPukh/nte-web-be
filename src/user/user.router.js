const { Router } = require('express');
const {
  httpPostUserUpdate,
  httpGetUser,
  httpGetUsers,
  httpGetAllUsersAdmin,
} = require('./user.controller');
const passport = require('../auth/services/passport');
const permissionCheck = require('./middlewares/permissionCheck');
const { multer } = require('../app/services/storage');

const userRouter = Router();

const authenticate = passport.authenticate('jwt', { session: false });

userRouter.post(
  '/update',
  authenticate,
  multer.single('photo'),
  permissionCheck,
  httpPostUserUpdate
);
userRouter.get('/admin/', [
  authenticate,
  permissionCheck,
  httpGetAllUsersAdmin,
]);
userRouter.get('/:id', authenticate, httpGetUser);

userRouter.get('/', authenticate, httpGetUsers);

module.exports = userRouter;
