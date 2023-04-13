const RegexEscape = require('regex-escape');
const { findProductById } = require('../product.model');
const { matchId, getPagination } = require('../../app/utils');
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

function convertObjToCollection(obj) {
  const keys = Object.keys(obj);
  return keys.length > 0
    ? { $and: keys.map((key) => ({ [key]: obj[key] })) }
    : {};
}

function createFilterFromQueryParams(query) {
  const { page, limit, ...filter } = query;
  let normalizedFilter = filter;
  if (Object.keys(filter).length > 0) {
    if (Object.keys(filter).length > 0) {
      if (filter.title) {
        normalizedFilter = {
          title: { $regex: RegexEscape(filter.title), $options: 'i' },
        };
      }
      if (filter.trademark) {
        normalizedFilter.trademark = {
          $regex: RegexEscape(filter.trademark),
          $options: 'i',
        };
      }
    }
  }
  return {
    ...getPagination({ page, limit }),
    ...convertObjToCollection(normalizedFilter),
  };
}

function checkMultipleIds(ids) {
  ids.forEach((id) => {
    if (!matchId(id)) {
      throw new ProductError('INVALID_ID');
    }
  });
}

module.exports = {
  isExist,
  createFilterFromQueryParams,
  checkMultipleIds,
};
