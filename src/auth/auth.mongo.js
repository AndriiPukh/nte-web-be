const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { accessTokenTime } = require('../app/configs');

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
    expires: accessTokenTime,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Token', tokenSchema);
