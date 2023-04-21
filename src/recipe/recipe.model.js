const RecipeDB = require('./recipe.mongo');

async function saveRecipe(data) {
  const recipe = new RecipeDB(data);
  return recipe.save();
}

module.exports = {
  saveRecipe,
};
