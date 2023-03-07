const { createNewUser } = require('./auth.model');

async function httpRegister(req, res) {
  const { userName, password, email } = req.body;
  try {
    await createNewUser(userName, password, email);
    res.status(200).json({ userName, message: 'Sign up successfully!' });
  } catch (err) {
    res.status(400).json({ err });
  }
}

module.exports = {
  httpRegister,
};
