const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middlewares');
const role = require('../middlewares/role.middleware');
const { ROLES } = require('../constants/roles.constant');
const controller = require('../Controllers/auth.controller');

// Profile - chỉ cần đăng nhập, ADMIN, STAFF, USER đều xem được
router.get('/profile', auth, role(ROLES.ADMIN, ROLES.STAFF, ROLES.USER, ROLES.MANAGER), controller.profile);

module.exports = router;
