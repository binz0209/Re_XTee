// backend/src/models/friendshipModel.js
const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
  userId1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userId2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  friendshipDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Blocked', 'Rejected'],
    required: true,
  },
});

const Friendship = mongoose.model('Friendship', friendshipSchema);

module.exports = Friendship;
