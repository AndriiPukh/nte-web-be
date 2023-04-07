const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { accessSecret } = require('../app/configs');

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: accessSecret,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Token', tokenSchema);
