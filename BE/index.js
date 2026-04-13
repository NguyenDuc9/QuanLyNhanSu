const db = require('./src/config/config');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3001;
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
//Router Phong Ban
app.use('/api/phong-ban', require('./src/Router/Router.PhongBan'));
//Router Phu Cap
app.use('/api/phu-cap', require('./src/Router/Router.PhuCap'));
// Router Cham Cong
app.use('/api/cham-cong', require('./src/Router/Router.ChamCong'));
// Router Luong
app.use('/api/luong', require('./src/Router/Router.Luong'));
// Router Luong
app.use('/api/chi-tiet', require('./src/Router/Router.ChiTieChamCong'));
// Router Nghi Phep
app.use('/api/nghi-phep', require('./src/Router/Router.NghiPhep'));
// Các route khác (nếu có)...
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
