const { Router } = require('express');
const { registerValidation } = require('./auth.utils');
const { loginRateLimit } = require('./rateLimit.miidleware');

const {
  httpCreateUser,
  httpLogin,
  httpGetRefresh,
  httpGetLogout,
} = require('./auth.controller');

const authRouter = Router();

authRouter.post('/register', registerValidation, httpCreateUser);
authRouter.post('/login', loginRateLimit, httpLogin);
authRouter.get('/refresh', httpGetRefresh);
authRouter.get('/logout', httpGetLogout);

module.exports = authRouter;
