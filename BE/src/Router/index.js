const express = require('express');
const router = express.Router();

router.use('/de-xuat-tang-luong', require('./Route.DeXuatTangLuong'));

router.use('/dot-tang-luong', require('./Route.DotTangLuong'));

// Auth: login, refresh (công khai)
router.use('/auth', require('./auth.router'));

// Tài khoản: get-all (cần token + role hợp lệ)
router.use('/tai-khoan', require('./Router.TaiKhoan'));

// User: profile (cần token + role hợp lệ)
router.use('/users', require('./user.router'));

// Nhan Vien
router.use('/nhan-vien', require('./Router.NhanVien'));

// Admin: register (chỉ ADMIN)
router.use('/admin', require('./admin.router'));

// Thuong phat
router.use('/thuong-phat', require('./Router.ThuongPhat'));

// Hop dong lao dong
router.use('/hop-dong', require('./Router.HopDongLD'));

// Phong Ban
router.use('/phong-ban', require('./Router.PhongBan'));

// Phu Cap
router.use('/phu-cap', require('./Router.PhuCap'));

// Cham Cong
router.use('/cham-cong', require('./Router.ChamCong'));

// Luong
router.use('/luong', require('./Router.Luong'));

// Chi tiet cham cong
router.use('/chi-tiet', require('./Router.ChiTieChamCong'));

// Nghi Phep
router.use('/nghi-phep', require('./Router.NghiPhep'));

// Nhiem Vu Tong
router.use('/nhiem-vu-tong', require('./Router.NhiemVuTong'));

// Ke Hoach Cong Viec
router.use('/ke-hoach', require('./Router.KeHoachCongViec'));

// Duyet Ke Hoach
router.use('/duyet-ke-hoach', require('./Router.DuyetKeHoach'));

// Giao Viec Nhan Vien
router.use('/giao-viec-nhan-vien', require('./Router.GiaoViecNhanVien'));

// Bao Cao Tien Do
router.use('/bao-cao-tien-do', require('./Router.BaoCaoTienDo'));

// Lich Su Cong Viec
router.use('/lich-su', require('./Router.LichSuCongViec'));

// File Cong Viec
router.use('/file-cong-viec', require('./Router.FileCongViec'));

// Kinh Nghiem Lam Viec
router.use('/kinh-nghiem-lam-viec', require('./KinhNghiemLamViecRouter'));

// Chat
router.use('/chat', require('./chatRoutes'));

module.exports = router;
