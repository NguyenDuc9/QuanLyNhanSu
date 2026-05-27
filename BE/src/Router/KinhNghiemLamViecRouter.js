const express = require('express');
const router = express.Router();

const controller = require('../controllers/KinhNghiemLamViecController');

// GET ALL
router.get('/', controller.getAll);

// GET BY ID
router.get('/:id', controller.getById);

router.get('/ma-nv/:id', controller.getByMaNV);

// CREATE
router.post('/', controller.create);

// UPDATE
router.put('/:id', controller.update);

// DELETE
router.delete('/:id', controller.delete);

module.exports = router;
