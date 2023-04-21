const { log } = require('winston');
const { isProductExist } = require('../../product/helpers/productHelpers');

async function checkProductForIngredients(ingredients) {
  const result = [];
  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
    const { products } = ingredient;
    for (let j = 0; j < products.length; j++) {
      // eslint-disable-next-line no-await-in-loop
      await isProductExist(products[j].product);
      ingredient.amount = +ingredient.amount;
      result.push(ingredient);
    }
  }
  return result;
}

module.exports = { checkProductForIngredients };
