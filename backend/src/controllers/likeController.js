// backend/src/controllers/likeController.js
const Like = require('../models/likeModel');

exports.createLike = async (req, res) => {
  try {
    const newLike = new Like(req.body);
    await newLike.save();
    res.status(201).json(newLike);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLikesByPost = async (req, res) => {
  try {
    const likes = await Like.find({ postId: req.params.postId });
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const deletedLike = await Like.findByIdAndDelete(req.params.likeId);
    if (!deletedLike) return res.status(404).json({ message: 'Like not found' });
    res.status(200).json({ message: 'Like deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
