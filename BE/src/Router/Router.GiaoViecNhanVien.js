const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/Controller.GiaoViecNhanVien');

router.get('/', ctrl.getAll);
router.get('/:MaGV', ctrl.getById);
router.get('/ke-hoach/:MaKH', ctrl.getByKH);
router.get('/nhan-vien/:MaNV', ctrl.getByNhanVien);
router.get('/nhan-vien/:MaNV/:MaKH', ctrl.getByNhanVienvaNV);
router.get('/trang-thai/:TrangThai', ctrl.getByTrangThai);
router.post('/', ctrl.create);
router.put('/:MaGV', ctrl.update);
router.patch('/:MaGV/trang-thai', ctrl.updateTrangThai);
router.patch('/:MaGV/phan-tram', ctrl.updatePhanTram);
router.delete('/:MaGV', ctrl.delete);

module.exports = router;
