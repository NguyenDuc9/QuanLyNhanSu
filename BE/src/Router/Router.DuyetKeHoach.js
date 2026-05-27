const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/Controller.DuyetKeHoach');

router.get('/', ctrl.getAll);
router.get('/:MaDuyet', ctrl.getById);
router.get('/ke-hoach/:MaKH', ctrl.getByKH);
router.get('/giam-doc/:MaGiamDoc', ctrl.getByGiamDoc);
router.post('/', ctrl.create);
router.put('/:MaDuyet', ctrl.update);
router.patch('/:MaDuyet/duyet', ctrl.duyet);
router.patch('/:MaDuyet/tu-choi', ctrl.tuChoi);
router.delete('/:MaDuyet', ctrl.delete);

module.exports = router;
