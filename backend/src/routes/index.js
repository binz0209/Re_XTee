// backend/src/routes/index.js
const express = require('express');
const router = express.Router();

router.use('/ads', require('./adRoutes'));
router.use('/audit-logs', require('./auditLogRoutes'));
router.use('/comments', require('./commentRoutes'));
router.use('/friendships', require('./friendshipRoutes'));
router.use('/likes', require('./likeRoutes'));
router.use('/messages', require('./messageRoutes'));
router.use('/notifications', require('./notificationRoutes'));
router.use('/posts', require('./postRoutes'));
router.use('/reports', require('./reportRoutes'));
router.use('/users', require('./userRoutes'));
// Nếu có route cho otpUtil
// router.use('/otp', require('./otpUtilRoutes'));

module.exports = router;
