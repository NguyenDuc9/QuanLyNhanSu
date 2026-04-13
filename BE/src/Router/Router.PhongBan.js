const express = require('express');
const router = express.Router();
const NhanVienController = require('../Controllers/Controller.PhongBan');

router.get('/', NhanVienController.getAll);
router.get('/:MaPhongBan', NhanVienController.getById);
router.post('/', NhanVienController.create);
router.put('/:MaPhongBan', NhanVienController.update);
router.delete('/:MaPhongBan', NhanVienController.delete);
module.exports = router;
