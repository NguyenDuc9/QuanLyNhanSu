const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/Controller.LichSuCongViec');

router.get('/', ctrl.getAll);
router.get('/:MaLS', ctrl.getById);
router.get('/giao-viec/:MaGV', ctrl.getByGV);
router.get('/nhan-vien/:MaNV', ctrl.getByNhanVien);
router.post('/', ctrl.create);
router.put('/:MaLS', ctrl.update);
router.delete('/:MaLS', ctrl.delete);

module.exports = router;
