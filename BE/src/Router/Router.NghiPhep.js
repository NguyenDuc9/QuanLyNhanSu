const express = require('express');
const router = express.Router();
const NghiPhepController = require('../Controllers/Controller.NghiPhep');
router.get('/', NghiPhepController.getAll);
router.get('/:MaNV', NghiPhepController.getById);
router.post('/', NghiPhepController.create);
router.put('/:MaNghiPhep', NghiPhepController.update);
router.delete('/:MaNghiPhep', NghiPhepController.delete);
module.exports = router;
