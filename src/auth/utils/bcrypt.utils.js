const bcryptjs = require('bcryptjs');

async function passwordHash(password) {
  return bcryptjs.hash(password, 10);
}

async function verifyPassword(password, hashedPassword) {
  return bcryptjs.compare(password, hashedPassword);
}

module.exports = {
  passwordHash,
  verifyPassword,
};
