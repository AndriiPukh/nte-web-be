const { Router } = require('express');
const {
  httpPostUserUpdate,
  httpGetUser,
  httpGetUsers,
  httpGetAllUsersAdmin,
} = require('./user.controller');
const { authenticate } = require('../auth/services/passport');
const permissionCheck = require('../app/middlewares/permissionCheck');
const { multer } = require('../app/services/storage');
const { validation } = require('./utils');

const userRouter = Router();
/**
 * A UpdateBody
 * @typedef {object} UpdateBody
 * @property {string} birthDate.required - The birthday
 * @property {string} firstName.required - The first name
 * @property {string} lastName.required - The last name
 * @property {string} id.required - The user id
 * @property {photo} photo - The user avatar - binary
 */

/**
 * A additionalInformation
 * @typedef {object} additionalInformation
 * @property {string} birthDate - Birthday
 * @property {string} firstName - Firstname
 * @property {string} lastName - Lastname
 * @property {string} photoUrl - User Avatar
 */

/**
 * A User
 * @typedef {object} User
 * @property {string} _id - User id
 * @property {string} email - Email
 * @property {additionalInformation} additionalInformation - Additional Info
 * @property {string} createdAt - Time of user creation
 * @property {string} role - User permission
 * @property {string} updatedAt - Time the last update
 * @property {boolean} verified - User verification
 */

/**
 * POST /users/update
 * @tags Users
 * @summary Endpoint for updating user after his verification
 * @param {UpdateBody} request.body - The user profile info - multipart/form-data
 * @return {User} 200 - Success response
 * @return {object} 400 - Bad request
 * @example response - 200 - Example success response
 * {
 *    "_id": "id",
 *     "email": "email@email.com",
 *     "additionalInformation": {
 *         "birthDate": "1995-07-17T00:00:00.000Z",
 *         "firstName": "FirstName",
 *         "lastName": "LastName",
 *         "photoUrl": "https://photoUrl/"
 *     },
 *     "createdAt": "2023-03-23T07:51:18.421Z",
 *     "role": "admin",
 *     "updatedAt": "2023-04-04T07:44:58.805Z",
 *     "verified": true
 * }
 * @example response - 400 - Example error response
 * {
 *   "errors": [
 *     {
 *       "birthDate": "Value '' - Invalid date format"
 *     }
 *   ]
 * }
 */
userRouter.post(
  '/update',
  authenticate,
  multer.single('photo'),
  permissionCheck,
  validation,
  httpPostUserUpdate
);

/**
 * GET /users/admin
 * @tags Users
 * @summary The admin endpoint for get verified and unverified users (last with token for verification)
 * @return {array<User>} 200 - Array of users
 */
userRouter.get('/admin', [authenticate, permissionCheck, httpGetAllUsersAdmin]);
/**
 * GET /users/{id}
 * @tags Users
 * @summary Get user info by user id
 * @param {string} id.path - user id
 * @param {number} page.query - pagination page
 * @param {number} limit.query - pagination limit
 * @return {User} 200 - success response
 */
userRouter.get('/:id', authenticate, httpGetUser);

/**
 * GET /users/
 * @tags Users
 * @summary Get users
 * @param {number} page.query - pagination page
 * @param {number} limit.query - pagination limit
 * @return {array<User>} 200 - success response
 */
userRouter.get('/', authenticate, httpGetUsers);

module.exports = userRouter;
