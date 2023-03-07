const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  token: String,
  expires: Date,
  revoked: Date,
  ipAddress: String,
});

refreshTokenSchema.virtual('isExpired').get(() => Date.now() >= this.expires);
refreshTokenSchema
  .virtual('isActive')
  .get(() => !this.revoked && !this.isExpired);
module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
