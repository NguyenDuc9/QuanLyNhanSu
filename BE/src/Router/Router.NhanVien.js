const express = require('express');
const router = express.Router();
const NhanVienController = require('../Controllers/Controller.NhanVien');

router.get('/', NhanVienController.getAll);
router.get('/:MaNV', NhanVienController.getById);
router.get('/phong-ban/:id', NhanVienController.getByMaPB);
router.post('/', NhanVienController.create);
router.put('/:MaNV', NhanVienController.update);
router.delete('/:MaNV', NhanVienController.delete);
module.exports = router;
