const { Router } = require('express');
const { registerValidation } = require('./auth.utils');

const { httpRegister, httpLogin } = require('./auth.controller');

const authRouter = Router();

authRouter.post('/register', registerValidation, httpRegister);
authRouter.post('/login', httpLogin);

module.exports = authRouter;
