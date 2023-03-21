require('dotenv').config();

module.exports = {
  bucketName: process.env.GOOGLE_CLOUD_BUCKET_NAME,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
};
