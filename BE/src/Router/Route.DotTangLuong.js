const express = require('express');
const router = express.Router();

const TangLuong = require('../Controllers/Controler.DeXuatvaTaoDotTangLuong');

// Đợt tăng lương
router.get('/', TangLuong.getAllDotTL);
router.get('/:MaDotTL', TangLuong.getDotTLById);
router.post('/', TangLuong.createDotTL);
router.put('/:MaDotTL', TangLuong.updateDotTL);
router.delete('/:MaDotTL', TangLuong.deleteDotTL);
module.exports = router;
