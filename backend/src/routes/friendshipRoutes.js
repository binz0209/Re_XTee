// backend/src/routes/friendshipRoutes.js
const express = require('express');
const router = express.Router();
const Friendship = require('../models/friendshipModel');

// Create a new friendship request
router.post('/', async (req, res) => {
  try {
    const newFriendship = new Friendship(req.body);
    await newFriendship.save();
    res.status(201).json(newFriendship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all friendships of a user
router.get('/:userId', async (req, res) => {
  try {
    const friendships = await Friendship.find({
      $or: [{ userId1: req.params.userId }, { userId2: req.params.userId }]
    });
    res.status(200).json(friendships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update friendship status
router.put('/:friendshipId', async (req, res) => {
  try {
    const updatedFriendship = await Friendship.findByIdAndUpdate(req.params.friendshipId, req.body, { new: true });
    if (!updatedFriendship) return res.status(404).json({ message: 'Friendship not found' });
    res.status(200).json(updatedFriendship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a friendship
router.delete('/:friendshipId', async (req, res) => {
  try {
    const deletedFriendship = await Friendship.findByIdAndDelete(req.params.friendshipId);
    if (!deletedFriendship) return res.status(404).json({ message: 'Friendship not found' });
    res.status(200).json({ message: 'Friendship deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
