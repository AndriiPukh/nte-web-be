const { validationResult } = require('express-validator');
const { saveRecipe } = require('./recipe.model');
const { statusCode } = require('../app/configs');
const { ValidationError } = require('../app/errors');
const { uploadFile } = require('../app/utils/uploadFileToStorage');
const { checkProductForIngredients } = require('./helpers/recipeHelpers');

async function httpPostCreateRecipe(req, res, next) {
  try {
    const validationErrors = validationResult(req).formatWith(({ msg }) => msg);
    if (!validationErrors.isEmpty()) {
      throw new ValidationError('Recipe', validationErrors.errors);
    }
    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadFile(req.file);
    }
    const { ingredients, ...fields } = req.body;
    const normalizedIngredients = await checkProductForIngredients(ingredients);

    const newRecipe = {
      ...fields,
      imageUrl,
      ingredients: normalizedIngredients,
      creator: JSON.parse(req.user).userId,
    };
    const recipe = await saveRecipe(newRecipe);
    res.status(statusCode.OK).json({ id: recipe._id });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  httpPostCreateRecipe,
};
