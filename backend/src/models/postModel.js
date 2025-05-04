// backend/src/models/postModel.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  media: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  isAd: {
    type: Boolean,
    default: false,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
