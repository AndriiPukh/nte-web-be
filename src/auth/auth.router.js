const { Router } = require('express');
const { registerValidation } = require('./auth.utils');

const {
  httpCreateUser,
  httpLogin,
  httpGetRefresh,
} = require('./auth.controller');

const authRouter = Router();

authRouter.post('/register', registerValidation, httpCreateUser);
authRouter.post('/login', httpLogin);
authRouter.get('/refresh', httpGetRefresh);

module.exports = authRouter;
