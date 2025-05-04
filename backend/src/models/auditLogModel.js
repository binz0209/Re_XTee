// backend/src/models/auditLogModel.js
const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  actionType: {
    type: String,
    enum: ['login', 'logout', 'post_created', 'post_deleted'],
    required: true,
  },
  targetPostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  actionTimestamp: {
    type: Date,
    default: Date.now,
  },
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
