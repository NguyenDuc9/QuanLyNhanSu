const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/Controller.KeHoachCongViec');

router.get('/', ctrl.getAll);
router.get('/:MaKH', ctrl.getById);
router.get('/nvt/:MaNVT', ctrl.getByNVT);
router.get('/truong-phong/:MaTruongPhong', ctrl.getByTruongPhong);
router.get('/trang-thai/:TrangThai', ctrl.getByTrangThai);
router.post('/', ctrl.create);
router.put('/:MaKH', ctrl.update);
router.patch('/:MaKH/trang-thai', ctrl.updateTrangThai);
router.delete('/:MaKH', ctrl.delete);

module.exports = router;
