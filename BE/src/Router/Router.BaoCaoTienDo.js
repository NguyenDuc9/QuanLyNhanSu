const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/Controller.BaoCaoTienDo');

router.get('/', ctrl.getAll);
router.get('/:MaBaoCao', ctrl.getById);
router.get('/giao-viec/:MaGV', ctrl.getByGV);
router.get('/giao-viec/:MaGV/latest', ctrl.getLatestByGV);
router.post('/', ctrl.create);
router.put('/:MaBaoCao', ctrl.update);
router.delete('/:MaBaoCao', ctrl.delete);

module.exports = router;
