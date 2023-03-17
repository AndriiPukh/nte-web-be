const request = require('supertest');
const app = require('../app');
const { mongoConnect, mongoDisconnect } = require('../app/services/mongo');
const { redisConnect, redisDisconnect } = require('../app/services/redis');
const UserDB = require('./user.mongo');
const { statusCode } = require('../app/configs');

describe('Test Auth API', () => {
  beforeAll(async () => {
    await redisConnect();
    await mongoConnect();
    await UserDB.deleteMany({});
  });

  afterAll(async () => {
    await redisDisconnect();
    await mongoDisconnect();
  });

  describe('POST /register', () => {
    const validUserData = {
      userName: 'John Dou',
      email: 'john.dou@gmail.com',
      password: 'Password',
    };

    const invalidUserData = {
      userName: 'Jo',
      email: 'john.dougmail.com',
      password: 'Pa',
    };

    const expectedData = {
      userName: 'John Dou',
      email: 'john.dou@gmail.com',
      role: 'user',
      permissions: [],
    };

    const possibleErrors = ['User with this name or email already exist.'];
    const validationErrors = [
      {
        userName:
          "Value 'Jo' is not valid! Username must contain from 3 to 18 characters",
      },
      {
        email: "Value 'john.dougmail.com' is not valid! Email is wrong format!",
      },
      {
        password:
          "Value 'Pa' is not valid! The password must be more than 8 characters long.",
      },
    ];

    test('Create user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(validUserData)
        .expect('Content-Type', /json/)
        .expect(statusCode.CREATED);

      expect(response.body.user).toMatchObject(expectedData);
    });

    test('User exist', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(validUserData)
        .expect('Content-Type', /json/)
        .expect(statusCode.CONFLICT);

      expect(response.body.error).toEqual(possibleErrors[0]);
    });

    test('Validation errors', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidUserData)
        .expect('Content-Type', /json/)
        .expect(statusCode.BAD_REQUEST);

      expect(response.body.errors).toMatchObject(validationErrors);
    });
  });

  describe('POST /login', () => {
    const validLogin = {
      userName: 'John Dou',
      password: 'Password',
    };

    const invalidLoginData = {
      userName: 'John Do',
      password: 'Passwor',
    };

    const loginError = {
      error: 'The username or password you entered is incorrect.',
    };

    test('Login success', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(validLogin)
        .expect('Content-Type', /json/)
        .expect(statusCode.OK);
      expect(response.body.user.userName).toEqual(validLogin.userName);
    });

    test('Login invalid user name', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          userName: invalidLoginData.userName,
          password: validLogin.password,
        })
        .expect('Content-Type', /json/)
        .expect(statusCode.BAD_REQUEST);
      expect(response.body).toMatchObject(loginError);
    });

    test('Login invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          userName: validLogin.userName,
          password: invalidLoginData.password,
        })
        .expect('Content-Type', /json/)
        .expect(statusCode.BAD_REQUEST);
      console.log(response, 'response cookies');
      expect(response.body).toMatchObject(loginError);
    });
  });
});
