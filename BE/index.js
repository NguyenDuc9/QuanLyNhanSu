const db = require('./src/config/config');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
// Auth: login, refresh (công khai)
app.use('/api/auth', require('./src/Router/auth.router'));
// Nhan Vien
// Tài khoản: get-all (cần token + role hợp lệ)
app.use('/api/tai-khoan', require('./src/Router/Router.TaiKhoan'));
// User: profile (cần token + role hợp lệ)
app.use('/api/users', require('./src/Router/user.router'));
//NhanVien
app.use('/api/nhan-vien', require('./src/Router/Router.NhanVien'));
// Admin: register (chỉ ADMIN)
app.use('/api/admin', require('./src/Router/admin.router'));
// Thuong phat
app.use('/api/thuong-phat', require('./src/Router/Router.ThuongPhat'));
// Hop dong lao dong
app.use('/api/hop-dong', require('./src/Router/Router.HopDongLD'));
// Các route khác (nếu có)...
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
