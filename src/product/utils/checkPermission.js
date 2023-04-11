function checkPermission(id, { userId, role }) {
  return id === userId || role === 'admin';
}

module.exports = checkPermission;
