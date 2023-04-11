const UserError = require('../../user/errors/UserErorr');

function getParam(path) {
  const module = path.replace('/api/', '');
  switch (module) {
    case 'users':
      return 'id';
    case 'products':
      return 'creator';
    default:
      return 'id';
  }
}

function permissionCheck(req, res, next) {
  const { userId, role } = JSON.parse(req.user);
  const correctParam = getParam(req.baseUrl);
  const id = req.body[correctParam];

  if (userId === id || role === 'admin') {
    next();
  } else {
    throw new UserError('FORBIDDEN');
  }
}

module.exports = permissionCheck;
