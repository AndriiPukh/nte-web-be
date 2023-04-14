function checkPermission(id, { userId, role }) {
  return id.toString() === userId || role === 'admin';
}

module.exports = checkPermission;
