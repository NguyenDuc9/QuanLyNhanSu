const express = require('express');
const router = express.Router();
const ControllerChamCong = require('../Controllers/Controller.ChamCong');

router.get('/', ControllerChamCong.getAll);
router.get('/conghomnay', ControllerChamCong.ChamCongHomNay);
router.post('/', ControllerChamCong.create);
router.put('/:MaChamCong', ControllerChamCong.update);
router.delete('/:MaChamCong', ControllerChamCong.delete);
module.exports = router;
