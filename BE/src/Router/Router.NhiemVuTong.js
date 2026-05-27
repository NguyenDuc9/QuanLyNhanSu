const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/Controller.NhiemVuTong');

router.get('/', ctrl.getAll);
router.get('/:MaNVT', ctrl.getById);
router.get('/phong-ban/:MaNV', ctrl.getByPhongBan);
router.get('/giam-doc/:MaGiamDoc', ctrl.getByGiamDoc);
router.post('/', ctrl.create);
router.put('/:MaNVT', ctrl.update);
router.patch('/:MaNVT/trang-thai', ctrl.updateTrangThai);
router.delete('/:MaNVT', ctrl.delete);

module.exports = router;
