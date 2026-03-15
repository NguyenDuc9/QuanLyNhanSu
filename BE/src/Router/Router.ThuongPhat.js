const express = require('express');
const router = express.Router();
const ThuongPhatController = require('../Controllers/Controller.ThuongPhat');

router.get('/', ThuongPhatController.getAll);
router.get('/:MaNV', ThuongPhatController.getById);
router.post('/', ThuongPhatController.create);
router.put('/:MaNV', ThuongPhatController.update);
router.delete('/:MaNV', ThuongPhatController.delete);
module.exports = router;
