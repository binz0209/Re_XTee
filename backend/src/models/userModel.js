// backend/src/models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Member'],
    required: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  birthday: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  friendsCount: {
    type: Number,
    default: 0,
  },
  postsCount: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
