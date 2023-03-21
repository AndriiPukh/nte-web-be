const { Storage } = require('@google-cloud/storage');
const path = require('path');
const Multer = require('multer');
const { log } = require('winston');
const {
  storage: { bucketName, projectId },
} = require('../configs');

const multer = new Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger 5mb
  },
});

const storage = new Storage({
  projectId,
  keyFilename: path.join(__dirname, '..', '..', '..', 'cloud-account.json'),
});

const bucket = storage.bucket(bucketName);
module.exports = {
  bucket,
  multer,
};
