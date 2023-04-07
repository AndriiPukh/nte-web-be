const { productValidation } = require('./product.validation');
const normalizeCategory = require('./normalizeCategories');

module.exports = { validation: productValidation, normalizeCategory };
