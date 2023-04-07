const UserError = require('../../user/errors/UserErorr');

function permissionCheck(req, res, next) {
  const { userId, role } = JSON.parse(req.user);
  const { id } = req.body;

  if (userId === id || role === 'admin') {
    next();
  } else {
    throw new UserError('FORBIDDEN');
  }
}

module.exports = permissionCheck;
