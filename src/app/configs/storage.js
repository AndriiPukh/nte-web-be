require('dotenv').config();

module.exports = {
  bucketName: process.env.GOOGLE_CLOUD_BACKET_NAME,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
};
