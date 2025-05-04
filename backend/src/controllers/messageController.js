// backend/src/controllers/messageController.js
const Message = require('../models/messageModel');

exports.createMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMessagesBetweenUsers = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 }
      ]
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(req.params.messageId, req.body, { new: true });
    if (!updatedMessage) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.messageId);
    if (!deletedMessage) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
