const request = require('supertest');
const app = require('../app');
const { mongoConnect, mongoDisconnect } = require('../app/services/mongo');
const UserDB = require('./user.mongo');
const { statusCode } = require('../app/configs');

describe('Test Auth API', () => {
  beforeAll(async () => {
    await mongoConnect();
    await UserDB.deleteMany({});
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test POST /register', () => {
    const validUserData = {
      userName: 'John Dou',
      email: 'john.dou@gmail.com',
      password: 'Password',
    };

    const expectedData = {
      userName: 'John Dou',
      email: 'john.dou@gmail.com',
      role: 'user',
      permissions: [],
    };

    test('Create user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(validUserData)
        .expect('Content-Type', /json/)
        .expect(statusCode.CREATED);

      expect(response.body.user).toMatchObject(expectedData);
    });
  });

  // test('Jest runer', () => {});
});
