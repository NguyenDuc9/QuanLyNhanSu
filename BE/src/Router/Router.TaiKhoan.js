const express = require('express');
const router = express.Router();
const TaiKhoanController = require('../Controllers/Controller.TaiKhoan');
const controller = require('../Controllers/auth.controller');

// Route để lấy tất cả tài khoản
router.get('/', TaiKhoanController.getAll);
// Route để lấy tài khoản theo ID
router.get('/:TenDangNhap', TaiKhoanController.getById);
// Route để tạo tài khoản mới
router.post('/', controller.register);
// Route để cập nhật thông tin tài khoản
router.put('/:TenDangNhap', TaiKhoanController.update);
// Route để xóa tài khoản
router.delete('/:TenDangNhap', TaiKhoanController.delete);
module.exports = router;
