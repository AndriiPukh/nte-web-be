const { Router } = require('express');
const { httpRegister } = require('./auth.controller');

const authRouter = Router();

authRouter.post('/register', httpRegister);

module.exports = authRouter;
