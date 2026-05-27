const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/Controller.FileCongViec');

router.get('/', ctrl.getAll);
router.get('/:MaFile', ctrl.getById);
router.get('/giao-viec/:MaGV', ctrl.getByGV);
router.post('/', ctrl.create);
router.put('/:MaFile', ctrl.update);
router.delete('/:MaFile', ctrl.delete);

module.exports = router;
