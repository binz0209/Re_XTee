// backend/src/controllers/friendshipController.js
const Friendship = require('../models/friendshipModel');

exports.createFriendship = async (req, res) => {
  try {
    const newFriendship = new Friendship(req.body);
    await newFriendship.save();
    res.status(201).json(newFriendship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFriendships = async (req, res) => {
  try {
    const friendships = await Friendship.find({
      $or: [{ userId1: req.params.userId }, { userId2: req.params.userId }]
    });
    res.status(200).json(friendships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFriendship = async (req, res) => {
  try {
    const updated = await Friendship.findByIdAndUpdate(req.params.friendshipId, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Friendship not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFriendship = async (req, res) => {
  try {
    const deleted = await Friendship.findByIdAndDelete(req.params.friendshipId);
    if (!deleted) return res.status(404).json({ message: 'Friendship not found' });
    res.status(200).json({ message: 'Friendship deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
