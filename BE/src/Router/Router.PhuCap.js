const express = require('express');
const router = express.Router();
const PhuCapController = require('../Controllers/Controller.PhuCap');

router.get('/', PhuCapController.getAll);
router.get('/:MaPhuCap', PhuCapController.getById);
router.post('/', PhuCapController.create);
router.put('/:MaPhuCap', PhuCapController.update);
router.delete('/:MaPhuCap', PhuCapController.delete);
module.exports = router;
