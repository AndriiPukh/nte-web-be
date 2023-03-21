const { format } = require('util');
const { bucket } = require('../services/storage');
const {
  storage: { bucketName },
} = require('../configs');

async function makeFilePublic(fileName) {
  await bucket.file(fileName).makePublic();
}
async function uploadFile(file) {
  const fileName = file.originalname;
  const fileHandle = bucket.file(fileName);
  const [fileExist] = await fileHandle.exists();
  if (fileExist === false) {
    await fileHandle.save(file.buffer);
    await makeFilePublic(fileName);
  }
  return format(`https://storage.googleapis.com/${bucketName}/${fileName}`);
}

module.exports = {
  uploadFile,
};
