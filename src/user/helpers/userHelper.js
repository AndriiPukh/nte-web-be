const { findByUserId } = require('../user.model');
const { matchId } = require('../../app/utils');
const { UserError } = require('../errors');

async function isUserExist(id) {
  if (!matchId(id)) {
    throw new UserError('');
  }
  const user = await findByUserId(id);
  if (!user) {
    throw new UserError('N');
  }
}

module.exports = { isUserExist };
