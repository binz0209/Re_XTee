// backend/src/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/notificationModel');

// Create a new notification
router.post('/', async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all notifications for a user
router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single notification by ID
router.get('/:notificationId', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a notification
router.put('/:notificationId', async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(req.params.notificationId, req.body, { new: true });
    if (!updatedNotification) return res.status(404).json({ message: 'Notification not found' });
    res.status(200).json(updatedNotification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a notification
router.delete('/:notificationId', async (req, res) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(req.params.notificationId);
    if (!deletedNotification) return res.status(404).json({ message: 'Notification not found' });
    res.status(200).json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
