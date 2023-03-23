const { uploadFile } = require('../app/utils/uploadFileToStorage');
const { saveUser, findByUserId } = require('./user.model');
const UserError = require('./errors/UserErorr');
const { statusCode } = require('../app/configs');

async function httpPostUserUpdate(req, res, next) {
  try {
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
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
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
  const { skip, limit } = req.params;
}

module.exports = {
  httpPostUserUpdate,
  httpGetUser,
};
