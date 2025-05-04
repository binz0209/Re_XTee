// backend/src/models/adModel.js
const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  campaignName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  adContent: {
    type: String,
    required: true,
  },
  adType: {
    type: String,
    enum: ['Standard', 'VIP'],
    required: true,
  },
  clicksCount: {
    type: Number,
    default: 0,
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
  budget: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  media: {
    type: String,
  },
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
