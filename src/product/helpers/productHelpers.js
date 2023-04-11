const { findProductById } = require('../product.model');
const { matchId } = require('../../app/utils');
const { ProductError } = require('../errors');

async function isExist(id) {
  if (!matchId(id)) {
    throw new ProductError('INVALID_ID');
  }
  const product = await findProductById(id);
  if (!product) {
    throw new ProductError('NOT_FOUND');
  }

  return product;
}

module.exports = {
  isExist,
};
