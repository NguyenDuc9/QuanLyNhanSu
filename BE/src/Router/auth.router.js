const express = require('express');
const router = express.Router();
const controller = require('../Controllers/auth.controller');

// Công khai - không cần token
router.post('/login', controller.login);
router.post('/refresh', controller.refreshToken);

// Các route cần auth/permission ở admin.router hoặc user.router
module.exports = router;
