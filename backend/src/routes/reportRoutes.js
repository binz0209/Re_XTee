// backend/src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const Report = require('../models/reportModel');

// Create a new report
router.post('/', async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all reports for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const reports = await Report.find({ postId: req.params.postId });
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all reports for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.params.userId });
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a report
router.put('/:reportId', async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(req.params.reportId, req.body, { new: true });
    if (!updatedReport) return res.status(404).json({ message: 'Report not found' });
    res.status(200).json(updatedReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a report
router.delete('/:reportId', async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.reportId);
    if (!deletedReport) return res.status(404).json({ message: 'Report not found' });
    res.status(200).json({ message: 'Report deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
