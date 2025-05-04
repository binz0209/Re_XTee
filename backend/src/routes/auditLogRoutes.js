// backend/src/routes/auditLogRoutes.js
const express = require('express');
const router = express.Router();
const AuditLog = require('../models/auditLogModel');

// Create a new audit log
router.post('/', async (req, res) => {
  try {
    const newAuditLog = new AuditLog(req.body);
    await newAuditLog.save();
    res.status(201).json(newAuditLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all audit logs for a user
router.get('/:userId', async (req, res) => {
  try {
    const auditLogs = await AuditLog.find({ userId: req.params.userId });
    res.status(200).json(auditLogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single audit log by ID
router.get('/:logId', async (req, res) => {
  try {
    const auditLog = await AuditLog.findById(req.params.logId);
    if (!auditLog) return res.status(404).json({ message: 'Audit log not found' });
    res.status(200).json(auditLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an audit log
router.delete('/:logId', async (req, res) => {
  try {
    const deletedAuditLog = await AuditLog.findByIdAndDelete(req.params.logId);
    if (!deletedAuditLog) return res.status(404).json({ message: 'Audit log not found' });
    res.status(200).json({ message: 'Audit log deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
