const express = require('express');
const router = express.Router();
const TaiKhoanController = require('../Controllers/Controller.TaiKhoan');

// Route để lấy tất cả tài khoản
router.get('/get-all', TaiKhoanController.getAll);
module.exports = router;
