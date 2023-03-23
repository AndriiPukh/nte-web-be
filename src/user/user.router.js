const { Router } = require('express');
const { httpPostUserUpdate, httpGetUser } = require('./user.controller');
const passport = require('../auth/services/passport');
const permissionCheck = require('./middlewares/permissionCheck');
const { multer } = require('../app/services/storage');

const userRouter = Router();

userRouter.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  multer.single('photo'),
  permissionCheck,
  httpPostUserUpdate
);
userRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  httpGetUser
);

module.exports = userRouter;
