// backend/src/routes/likeRoutes.js
const express = require('express');
const router = express.Router();
const Like = require('../models/likeModel');

// Create a new like
router.post('/', async (req, res) => {
  try {
    const newLike = new Like(req.body);
    await newLike.save();
    res.status(201).json(newLike);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all likes for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const likes = await Like.find({ postId: req.params.postId });
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a like
router.delete('/:likeId', async (req, res) => {
  try {
    const deletedLike = await Like.findByIdAndDelete(req.params.likeId);
    if (!deletedLike) return res.status(404).json({ message: 'Like not found' });
    res.status(200).json({ message: 'Like deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
