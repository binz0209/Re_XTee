// backend/src/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');

// Create a new message
router.post('/', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all messages between two users
router.get('/:userId1/:userId2', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.params.userId1, receiverId: req.params.userId2 },
        { senderId: req.params.userId2, receiverId: req.params.userId1 }
      ]
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single message by ID
router.get('/:messageId', async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update message status
router.put('/:messageId', async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(req.params.messageId, req.body, { new: true });
    if (!updatedMessage) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a message
router.delete('/:messageId', async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.messageId);
    if (!deletedMessage) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
