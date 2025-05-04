// backend/src/models/reportModel.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reportReason: {
    type: String,
    required: true,
  },
  reportDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Pending',
  },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
