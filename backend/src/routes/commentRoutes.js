// backend/src/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all comments for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a comment
router.put('/:commentId', async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true });
    if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a comment
router.delete('/:commentId', async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
