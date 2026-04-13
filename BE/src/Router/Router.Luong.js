const express = require('express');
const router = express.Router();
const LuongController = require('../Controllers/Controller.Luong');

router.get('/', LuongController.getAll);
router.get('/:MaLuong', LuongController.getById);
router.post('/', LuongController.create);
router.post('/them-luong', LuongController.create);
router.put('/:MaLuong', LuongController.update);
router.delete('/:MaLuong', LuongController.delete);
router.get('/tinh-luong/:maNV/:thang/:nam', LuongController.getSalaryDetail);
module.exports = router;
