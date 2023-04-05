const { Router } = require('express');
const {
  auth: { registerValidation },
} = require('./utils');
const { loginRateLimit } = require('./middlewares/rateLimit');
const { authenticate } = require('./services/passport');

const {
  httpCreateUser,
  httpSignIn,
  httpGetRefresh,
  httpGetLogout,
  httpGetVerifyEmail,
} = require('./auth.controller');

const authRouter = Router();
/**
 * A UserSignUp
 * @typedef {object} UserSignUp
 * @property {string} userName.required - The username
 * @property {string} email.required - The user email
 * @property {string} password.required - The user password
 */
/**
 * A UserSignIn
 * @typedef {object} UserSignIn
 * @property {string} userName.required - The username
 * @property {string} password.required - The user password
 */

/**
 * POST /auth/signup
 * @tags Auth
 * @param {UserSignUp} request.body.required - User object - application/json
 * @return {object} 200 - User created
 * @return {object} 400 - Bad request
 * @return {object} 409 - Conflict
 * @example request - example payload
 * {
 *     "userName": "John Dou",
 *     "email": "john.dou@gmail.com",
 *     "password": "Password"
 * }
 * @example response - 200
 * {
 *    "accessToken": "token",
 *     "user": {
 *         "userName": "John Dou",
 *         "email": "jhon.dou@gmail.com",
 *         "role": "user",
 *         "permissions": []
 *     }
 * }
 * @example response - 409
 * {
 *    "error": "User with this name or email already exist."
 * }
 * @example response - 400
 * {
 *  "errors": [
 *         {
 *             "userName": "Value 'Jo' is not valid! Username must contain from 3 to 18 characters"
 *         },
 *         {
 *             "email": "Value 'jhon.dougmail.com' is not valid! Email is wrong format!"
 *         },
 *         {
 *             "password": "Value 'Pas' is not valid! The password must be more than 8 characters long."
 *         }
 *     ]
 * }
 */
authRouter.post('/signup', registerValidation, httpCreateUser);
/**
 * POST /auth/signin
 * @tags Auth
 * @param {UserSignIn} request.body.required - user info - application/json
 * @return {object} 200 - Login success
 * @return {object} 400 - Bad request
 * @example request - example payload
 * {
 *     "userName": "John Dou",
 *     "password": "Password"
 * }
 * @example response - 200
 * {
 *     "user": {
 *         "_id": "id",
 *         "userName": "userName",
 *         "email": "email",
 *         "role": "user",
 *         "permissions": []
 *     },
 *     "accessToken": "accessToken"
 *
 * }
 * @example response - 400
 * {
 *      "error": "The username or password you entered is incorrect."
 * }
 */
authRouter.post('/signin', loginRateLimit, httpSignIn);
/**
 * GET /auth/refresh
 * @tags Auth
 * @return {object} 200 - Success
 * @return {object} 401 - Unauthorized
 * @example response - 200
 * {
 *     "accessToken": "access token"
 * }
 * @example response - 401
 * {
 *   "error": "Unauthorized!"
 * }
 */
authRouter.get('/refresh', httpGetRefresh);
/**
 * GET /auth/signout
 * @tags Auth
 * @return {string} 204
 */
authRouter.get('/signout', authenticate, httpGetLogout);

/**
 * GET /auth/verify
 * @tags Auth
 * @param {string} request.params.id - id
 * @param {string} token
 * @return {string} 200
 */
authRouter.get('/verify/:id/:token', httpGetVerifyEmail);

module.exports = authRouter;
