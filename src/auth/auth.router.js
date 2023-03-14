const { Router } = require('express');
const { registerValidation } = require('./auth.utils');

const {
  httpRegister,
  httpLogin,
  httpGetRefresh,
} = require('./auth.controller');

const authRouter = Router();

authRouter.post('/register', registerValidation, httpRegister);
authRouter.post('/login', httpLogin);
authRouter.get('/refresh', httpGetRefresh);

module.exports = authRouter;
