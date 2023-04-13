const UserError = require('../../user/errors');

function isAdmin(req, res, next) {
  const { role } = JSON.parse(req.user);
  if (role === 'admin') {
    next();
  } else {
    throw new UserError('FORBIDDEN');
  }
}

module.exports = isAdmin;
