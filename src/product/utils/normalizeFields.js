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

function normalizeFields(fields) {
  const normalizedFields = fields;
  if (normalizedFields.price) {
    normalizedFields.price = +fields.price;
  }
  if (normalizedFields.amount) {
    normalizedFields.amount = +fields.amount;
  }
  let normalizedCategory = {};
  if (fields.category && fields.subCategory) {
    normalizedCategory = normalizeCategories(
      fields.category,
      fields.subCategory
    );
  }
  return { ...normalizedFields, ...normalizedCategory };
}

module.exports = normalizeFields;
