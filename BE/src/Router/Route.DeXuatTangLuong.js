const express = require('express');
const router = express.Router();

const TangLuong = require('../Controllers/Controler.DeXuatvaTaoDotTangLuong');

// Đề xuất tăng lương
router.get('/', TangLuong.getAllDeXuat);
router.get('/:MaDeXuat', TangLuong.getDeXuatById);
router.get('/dot/:MaDotTL', TangLuong.getDeXuatByDotTL);

router.post('/', TangLuong.createDeXuat);
router.put('/:MaDeXuat', TangLuong.updateDeXuat);

router.delete('/:MaDeXuat', TangLuong.deleteDeXuat);

module.exports = router;
