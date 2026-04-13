const express = require('express');
const router = express.Router();
const ControllerChamCong = require('../Controllers/Controller.ChiTietChamCong');

router.get('/', ControllerChamCong.getAll);
router.get('/:MaChamCong', ControllerChamCong.getByIdCC);
router.get('/lichsu/:MaChamCong', ControllerChamCong.getLichSu);
router.post('/chamvao', ControllerChamCong.create);
router.put('/chamra/:MaChiTiet', ControllerChamCong.update);
router.delete('/:MaChiTiet', ControllerChamCong.delete);
module.exports = router;
