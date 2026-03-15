const express = require('express');
const router = express.Router();
const HopDongController = require('../Controllers/Controle.HopDongLD');

router.get('/', HopDongController.getAll);
router.get('/:MaNV', HopDongController.getById);
router.post('/', HopDongController.create);
router.put('/:MaNV', HopDongController.update);
router.delete('/:MaNV', HopDongController.delete);
module.exports = router;
