const express = require('express');
const router = express.Router();
const ThuongPhatController = require('../Controllers/Controller.ThuongPhat');

router.get('/', ThuongPhatController.getAll);
router.get('/:MaTP', ThuongPhatController.getById);
router.post('/', ThuongPhatController.create);
router.put('/:MaTP', ThuongPhatController.update);
router.delete('/:MaTP', ThuongPhatController.delete);
module.exports = router;
