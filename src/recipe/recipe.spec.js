const request = require('supertest');
const { redisConnect, redisDisconnect } = require('../app/services/redis');
const { mongoConnect, mongoDisconnect } = require('../app/services/mongo');
const RecipeDB = require('./recipe.mongo');
const app = require('../app');
const { getAllUsers } = require('../user/user.model');
const { findTokenByUserId } = require('../auth/auth.model');
const { findAllProducts } = require('../product/product.model');
const {
  recipeData,
  wrongRecipeData,
  validationErrors,
} = require('./constants/recipeTest.constants');
const { statusCode } = require('../app/configs');

describe('Test Recipe API', () => {
  beforeAll(async () => {
    await redisConnect();
    await mongoConnect();
    await RecipeDB.deleteMany({});
  });
  afterAll(async () => {
    await redisDisconnect();
    await mongoDisconnect();
  });
  let user = null;
  let token = null;
  let recipeId = null;
  let productId = null;
  describe('POST /recipes/', () => {
    test('Create recipe - success', async () => {
      const users = await getAllUsers(0, 10);
      [user] = users;
      token = await findTokenByUserId(user._id);
      const products = await findAllProducts(0, 10);
      const { _id } = products[0];
      productId = _id;

      const newRecipe = recipeData;
      newRecipe.creator = user._id;
      newRecipe.ingredients[0].products[0].product = productId;
      const response = await request(app)
        .post('/api/recipes/')
        .send(newRecipe)
        .set({ Authorization: `Bearer ${token.accessToken}` })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(statusCode.OK);
      expect(response.body).toHaveProperty(
        'id',
        expect.stringMatching(/^[0-9a-fA-F]{24}$/)
      );
      recipeId = response.body.id;
    });
    test('Create recipe - validation errors', async () => {
      const response = await request(app)
        .post('/api/recipes/')
        .send(wrongRecipeData)
        .set({ Authorization: `Bearer ${token.accessToken}` })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(statusCode.BAD_REQUEST);
      expect(response.body.errors).toMatchObject(validationErrors);
    });
  });
});
