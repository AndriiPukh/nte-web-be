const request = require('supertest');
const app = require('../app');
const { mongoConnect, mongoDisconnect } = require('../app/services/mongo');
const { redisConnect, redisDisconnect } = require('../app/services/redis');
const { UserModel } = require('../app/providers/mongoProvider');
const AuthModel = require('./auth.model');
const { statusCode } = require('../app/configs');

describe('Test Auth API', () => {
  const validUserData = {
    email: 'john.dou@gmail.com',
    password: 'Password',
  };
  beforeAll(async () => {
    await redisConnect();
    await mongoConnect();
    await UserModel.deleteAll();
  });

  afterAll(async () => {
    await UserModel.deleteAll();
    await redisDisconnect();
    await mongoDisconnect();
  });

  describe('POST /signup', () => {
    const invalidUserData = {
      email: 'john.dougmail.com',
      password: 'Pa',
    };
    const possibleErrors = ['User already exist. Check your email to verify!'];
    const validationErrors = [
      {
        email: "Value 'john.dougmail.com' is not valid! Email is wrong format!",
      },
      {
        password:
          "Value 'Pa' is not valid! The password must be more than 8 characters long.",
      },
    ];

    test('Validation errors', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send(invalidUserData)
        .expect('Content-Type', /json/)
        .expect(statusCode.BAD_REQUEST);

      expect(response.body.errors).toMatchObject(validationErrors);
    });
    test('Create user', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send(validUserData)
        .expect('Content-Type', /json/)
        .expect(statusCode.CREATED);
      expect(response.body).toMatchObject({
        status: 'NOT_VERIFIED',
        email: validUserData.email,
      });
    });

    test('User exist', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send(validUserData)
        .expect('Content-Type', /json/)
        .expect(statusCode.CONFLICT);

      expect(response.body.error).toEqual(possibleErrors[0]);
    });
  });
  describe('GET /verify', () => {
    let user;

    test('Verified failure', async () => {
      user = await UserModel.findByUserEmail(validUserData.email);
      await request(app)
        .get(`/api/auth/verify/${user._id}/llsllslslsls`)
        .expect(statusCode.BAD_REQUEST);
    });

    test('Verified success', async () => {
      const token = await AuthModel.findTokenByUserId(user._id);
      const response = await request(app)
        .get(`/api/auth/verify/${user._id}/${token.accessToken}`)
        .expect('Content-Type', /json/)
        .expect(statusCode.OK);

      expect(response.body).toMatchObject({ status: 'VERIFIED' });
    });
  });
  describe('POST /signin', () => {
    const loginError = {
      error: 'The email or password you entered is incorrect.',
    };

    test('Signin success', async () => {
      const response = await request(app)
        .post('/api/auth/signin')
        .send(validUserData)
        .expect('Content-Type', /json/)
        .expect(statusCode.OK);
      expect(response.body).toHaveProperty('accessToken');
    });

    test('Signin invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/signin')
        .send({
          email: 'invalid@fdc.com',
          password: validUserData.password,
        })
        .expect('Content-Type', /json/)
        .expect(statusCode.BAD_REQUEST);
      expect(response.body).toMatchObject(loginError);
    });

    test('Signin invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/signin')
        .send({
          email: validUserData.email,
          password: 'Pass',
        })
        .expect('Content-Type', /json/)
        .expect(statusCode.BAD_REQUEST);
      expect(response.body).toMatchObject(loginError);
    });
  });
});
