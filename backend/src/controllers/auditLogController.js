// backend/src/controllers/auditLogController.js
const AuditLog = require('../models/auditLogModel');

exports.createAuditLog = async (req, res) => {
  try {
    const newLog = new AuditLog(req.body);
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLogsByUser = async (req, res) => {
  try {
    const logs = await AuditLog.find({ userId: req.params.userId });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAuditLogById = async (req, res) => {
  try {
    const log = await AuditLog.findById(req.params.logId);
    if (!log) return res.status(404).json({ message: 'Audit log not found' });
    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAuditLog = async (req, res) => {
  try {
    const deletedLog = await AuditLog.findByIdAndDelete(req.params.logId);
    if (!deletedLog) return res.status(404).json({ message: 'Audit log not found' });
    res.status(200).json({ message: 'Audit log deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
