const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller.js');

// Định nghĩa API: GET /api/chat/history?nguoiGui=admin&nguoiNhan=khachhang1
router.get('/history', chatController.getChatHistory);

module.exports = router;
