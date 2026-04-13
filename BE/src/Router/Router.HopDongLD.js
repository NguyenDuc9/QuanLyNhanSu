const express = require('express');
const router = express.Router();
const HopDongController = require('../Controllers/Controle.HopDongLD');

router.get('/', HopDongController.getAll);
router.get('/:MaHD', HopDongController.getById);
router.post('/', HopDongController.create);
router.put('/:MaHD', HopDongController.update);
router.delete('/:MaHD', HopDongController.delete);
module.exports = router;
