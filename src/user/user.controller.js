const { validationResult } = require('express-validator');
const { uploadFile } = require('../app/utils/uploadFileToStorage');
const {
  saveUser,
  findByUserId,
  getAllUsers,
  getAllActiveUsers,
} = require('./user.model');
const { findTokenByUserId } = require('../auth/auth.model');
const { UserError } = require('./errors');
const { ValidationError } = require('../app/errors');
const { statusCode } = require('../app/configs');
const { getPagination } = require('../app/utils/query');
const { matchId } = require('../app/utils');

async function httpPostUserUpdate(req, res, next) {
  try {
    const validationErrors = validationResult(req).formatWith(({ msg }) => msg);
    if (!validationErrors.isEmpty()) {
      throw new ValidationError('User', validationErrors.errors);
    }

    const { id, ...additionalInformation } = req.body;
    if (req.file) {
      additionalInformation.photoUrl = await uploadFile(req.file);
    }

    const user = await saveUser(
      { additionalInformation, updatedAt: Date.now() },
      id
    );

    res.status(statusCode.OK).send(user);
  } catch (err) {
    next(err);
  }
}

async function httpGetUser(req, res, next) {
  try {
    const { id } = req.params;
    if (!matchId(id)) {
      throw new UserError('NOT_FOUND');
    }
    const user = await findByUserId(id);
    if (user === null) {
      throw new UserError('NOT_FOUND');
    }
    res.status(statusCode.OK).send(user);
  } catch (err) {
    next(err);
  }
}

async function httpGetUsers(req, res, next) {
  try {
    const { skip, limit } = getPagination(req.query);
    const users = await getAllActiveUsers(skip, limit);
    res.status(statusCode.OK).send(users);
  } catch (err) {
    next(err);
  }
}

async function httpGetAllUsersAdmin(req, res) {
  const { skip, limit } = getPagination(req.query);
  const users = await getAllUsers(skip, limit);

  if (users.length) {
    for (let i = 0; i < users.length; i++) {
      if (!users[i].verified) {
        // eslint-disable-next-line no-await-in-loop
        const token = await findTokenByUserId(users[i]._id);
        if (token) {
          users[i].token = token.accessToken;
        }
      }
    }
  }

  res.status(statusCode.OK).json(users);
}

module.exports = {
  httpPostUserUpdate,
  httpGetUser,
  httpGetUsers,
  httpGetAllUsersAdmin,
};
