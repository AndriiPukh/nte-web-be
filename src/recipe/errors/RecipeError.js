const { APIError } = require('../../app/errors');
const recipeErrors = require('../constants/recipeError.constants');

class RecipeError extends APIError {
  constructor(errorName) {
    super(
      recipeErrors[errorName].name,
      recipeErrors[errorName].description,
      recipeErrors[errorName].httpCode
    );
  }
}

module.exports = RecipeError;
