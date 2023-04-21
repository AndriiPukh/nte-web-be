const { Router } = require('express');
const { authenticate } = require('../auth/services/passport');
const { httpPostCreateRecipe } = require('./recipe.controller');
const { newRecipeValidation } = require('./utils/recipeValidation');
const { multer } = require('../app/services/storage');

const recipeRouter = Router();
recipeRouter.use(authenticate);

/**
 * @typedef RecommendationsOfProducts
 * @property {string} userId - User id
 * @property {boolean} recommend - Boolean
 */

/**
 * @typedef ProductOfIngredient
 * @property {string} product - Product id
 * @property {array<RecommendationsOfProducts>} recommendation - Recommendations of products
 */

/**
 * @typedef Ingredient
 * @property {string} title - Name of ingredient
 * @property {number} amount - Quantity
 * @property {string} unit - Units
 * @property {array<ProductOfIngredient>} - products
 *
 */

/**
 * @typedef Comment
 * @property {string} text - Text of comments
 * @property {additionalInformation} author - The author of comment
 * @property {string} createdAt - Comment date
 * @property {string} _id - Comment id
 */

/**
 * @typedef NewRecipeData
 * @property {string} title - Recipe title
 * @property {string} imageUrl - Image of recipe
 * @property {string} description
 * @property {array<Ingredient>} ingredient
 */

/**
 * @typedef {NewRecipeData} Recipe
 * @property {array<Comment>} comments - comments of recipe
 *
 */

/**
 * POST /recipes/
 * @tags Recipes
 * @summary Endpoint for create new recipe
 * @param {NewRecipeData} request.body - The recipe data - multipart/form-data
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request
 * @example response - 200 - Example success response
 * {
 *   "id": "6438f66f7a32098cfb05a585"
 * }
 */
recipeRouter.post(
  '/',
  multer.single('image'),
  newRecipeValidation,
  httpPostCreateRecipe
);

module.exports = recipeRouter;
