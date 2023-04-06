const { CATEGORY_DICTIONARY } = require('../product.constant');

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key].includes(value));
}

function normalizeCategories(category, subCategory) {
  if (!CATEGORY_DICTIONARY[category][subCategory]) {
    const correctCategory = getKeyByValue(CATEGORY_DICTIONARY, subCategory);
    return { category: correctCategory, subCategory };
  }
  return { category, subCategory };
}

module.exports = normalizeCategories;
