function invalidPathHandler(_, response) {
  response.status(404);
  response.send('Invalid path');
}

module.exports = invalidPathHandler;
