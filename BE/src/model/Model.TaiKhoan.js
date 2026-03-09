const db = require('../config/config');
const TaiKhoan = (taikhoan) => {
  this.TenDangNhap = taikhoan.TenDangNhap;
  this.MatKhau = taikhoan.MatKhau;
  this.MaNV = taikhoan.MaNV;
  this.VaiTro = taikhoan.VaiTro;
};
TaiKhoan.getAll = (callback) => {
  const sql = 'SELECT * FROM taikhoan';
  db.query(sql, (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};
module.exports = TaiKhoan;
