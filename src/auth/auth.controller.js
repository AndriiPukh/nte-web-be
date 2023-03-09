const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {
  createNewUser,
  userFindByNameAndMatchingPassword,
} = require('./auth.model');

async function httpRegister(req, res, next) {
  const errorsAfterValidation = validationResult(req);
  console.log(errorsAfterValidation);
  try {
    const { userName, password, email } = req.body;
    await createNewUser(userName, password, email);
    res.status(200).json({ userName, message: 'Sign up successfully!' });
  } catch (err) {
    next(err);
  }
}

async function httpLogin(req, res, next) {
  try {
    const { userName, password } = req.body;
    const user = await userFindByNameAndMatchingPassword(userName, password);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  httpRegister,
  httpLogin,
};
