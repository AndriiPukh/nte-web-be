const request = require('supertest');
const { raw } = require('express');
const ProductDB = require('./product.mongo');
const { getAllUsers } = require('../user/user.model');
const { findTokenByUserId } = require('../auth/auth.model');
const { redisConnect, redisDisconnect } = require('../app/services/redis');
const { mongoConnect, mongoDisconnect } = require('../app/services/mongo');
const app = require('../app');
const { statusCode } = require('../app/configs');
const {
  newProduct,
  wrongProductData,
  validationErrors,
  getProductErrors,
  updateField,
  commentsText,
} = require('./constants/test.constants');

describe('Test Product API', () => {
  beforeAll(async () => {
    await redisConnect();
    await mongoConnect();
    await ProductDB.deleteMany({});
  });

  afterAll(async () => {
    await redisDisconnect();
    await mongoDisconnect();
  });
  let user = null;
  let token = null;
  let productId = null;
  let commentId = null;
  describe('POST /products/', () => {
    test('Create new product success', async () => {
      const users = await getAllUsers(0, 10);
      [user] = users;
      token = await findTokenByUserId(user._id);

      const response = await request(app)
        .post('/api/products/')
        .send(newProduct)
        .set({ Authorization: `Bearer ${token.accessToken}` })
        .expect('Content-Type', /json/)
        .expect(statusCode.OK);
      expect(response.body).toHaveProperty(
        'id',
        expect.stringMatching(/^[0-9a-fA-F]{24}$/)
      );
      productId = response.body.id;
    });

    test('Get validation errors', async () => {
      const response = await request(app)
        .post('/api/products/')
        .send(wrongProductData)
        .set({ Authorization: `Bearer ${token.accessToken}` })
        .expect('Content-Type', /json/)
        .expect(statusCode.BAD_REQUEST);
      expect(response.body.errors).toMatchObject(validationErrors);
    });
  });
  describe('GET /products/:id', () => {
    test('Get product by id', async () => {
      const response = await request(app)
        .get(`/api/products/${productId}`)
        .set({ Authorization: `Bearer ${token.accessToken}` })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(statusCode.OK);
      expect(response.body.title).toEqual(newProduct.title);
    });
    test('Invalid id', async () => {
      const response = await request(app)
        .get(`/api/products/6437be17223aad5141a1474`)
        .set({ Authorization: `Bearer ${token.accessToken}` })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(statusCode.BAD_REQUEST);

      expect(response.body.error).toEqual(getProductErrors.invalidId);
    });
    test('Product not found', async () => {
      const response = await request(app)
        .get(`/api/products/6437be17223aad5141a14744`)
        .set({ Authorization: `Bearer ${token.accessToken}` })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(statusCode.NOT_FOUND);

      expect(response.body.error).toEqual(getProductErrors.notFound);
    });
  });
  describe('PUT /products/:id', () => {
    test('Update product title success', async () => {
      const response = await request(app)
        .put(`/api/products/${productId}`)
        .send(updateField)
        .set({ Authorization: `Bearer ${token.accessToken}` })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(statusCode.OK);
      expect(response.body.title).toEqual(updateField.title);
    });
    test('Update product validation fields error', async () => {
      const response = await request(app)
        .put(`/api/products/${productId}`)
        .send(wrongProductData)
        .set({ Authorization: `Bearer ${token.accessToken}` })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(statusCode.BAD_REQUEST);
      expect(response.body.errors).toMatchObject(validationErrors);
    });
  });
  describe('POST /products/:id/comments', () => {
    test('Add comment success', async () => {
      const response = await request(app)
        .post(`/api/products/${productId}/comments`)
        .send(commentsText)
        .set({ Authorization: `Bearer ${token.accessToken}` })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(statusCode.OK);
      expect(response.body.comments.length).toEqual(1);
      commentId = response.body.comments[0]._id;
    });
  });
});
