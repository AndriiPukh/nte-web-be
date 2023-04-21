const request = require('supertest');
const app = require('../app');
const { statusCode } = require('../app/configs');
const { getAllUsers } = require('./user.model');
const { findTokenByUserId } = require('../auth/auth.model');
const { redisConnect, redisDisconnect } = require('../app/services/redis');
const { mongoConnect, mongoDisconnect } = require('../app/services/mongo');

describe('Test Users API', () => {
  let user;
  let token;
  beforeAll(async () => {
    await redisConnect();
    await mongoConnect();
  });

  afterAll(async () => {
    await redisDisconnect();
    await mongoDisconnect();
  });
  describe('GET /users/', () => {
    test('Get all verified users', async () => {
      const users = await getAllUsers(0, 10);
      // eslint-disable-next-line prefer-destructuring
      user = users[0];
      token = await findTokenByUserId(user._id);

      // eslint-disable-next-line no-shadow
      const response = await request(app)
        .get('/api/users/')
        .set({ Authorization: `Bearer ${token.accessToken}` })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(statusCode.OK);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /users/:id', () => {
    test('Get user by specific id', async () => {
      // eslint-disable-next-line no-shadow
      const response = await request(app)
        .get(`/api/users/${user._id}`)
        .set({ Authorization: `Bearer ${token.accessToken}` })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(statusCode.OK);
      expect(response.body.email).toEqual(user.email);
    });

    test('User not found or id is wrong', async () => {
      await request(app)
        .get(`/api/users/${user._id}123`)
        .set({ Authorization: `Bearer ${token.accessToken}` })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(statusCode.NOT_FOUND);
    });
  });

  describe('POST /users/update', () => {
    test('Success user update', async () => {
      const validUserObject = {
        birthDate: '1995-07-17T00:00:00.000Z',
        firstName: 'Andrii',
        lastName: 'Pukh',
        id: user._id,
      };
      // eslint-disable-next-line no-shadow
      const response = await request(app)
        .post('/api/users/update')
        .send(validUserObject)
        .set({ Authorization: `Bearer ${token.accessToken}` })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(statusCode.OK);
      expect(response.body.additionalInformation.firstName).toEqual(
        validUserObject.firstName
      );
    });
  });
});
