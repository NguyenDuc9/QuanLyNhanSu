const express = require('express');
const router = express.Router();
const TaiKhoanController = require('../Controllers/Controller.TaiKhoan');

// Route để lấy tất cả tài khoản
router.get('/', TaiKhoanController.getAll);
// Route để lấy tài khoản theo ID
router.get('/:MaNV', TaiKhoanController.getById);
// Route để tạo tài khoản mới
router.post('/', TaiKhoanController.create);
// Route để cập nhật thông tin tài khoản
router.put('/:MaNV', TaiKhoanController.update);
// Route để xóa tài khoản
router.delete('/:MaNV', TaiKhoanController.delete);
module.exports = router;
