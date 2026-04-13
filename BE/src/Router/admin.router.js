const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middlewares');
const role = require('../middlewares/role.middleware');
const { ROLES } = require('../constants/roles.constant');
const controller = require('../Controllers/auth.controller');

// Chỉ ADMIN mới được đăng ký tài khoản mới
router.post('/register', controller.register);
module.exports = router;
