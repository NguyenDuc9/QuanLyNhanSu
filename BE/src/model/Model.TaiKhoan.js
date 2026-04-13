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
      return callback(err);
    }
    callback(result);
  });
};

TaiKhoan.getById = (MaNV, callback) => {
  const sql = 'Select * from taikhoan where MaNV = ?';
  db.query(sql, [MaNV], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

TaiKhoan.create = (taikhoan, callback) => {
  const sql = 'insert into taikhoan set ?';
  db.query(sql, [taikhoan], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

TaiKhoan.update = (taikhoan, TenDangNhap, callback) => {
  const sql = 'update taikhoan set ? where TenDangNhap = ?';
  db.query(sql, [taikhoan, TenDangNhap], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

TaiKhoan.delete = (MaNV, callback) => {
  const sql = 'delete from taikhoan where TenDangNhap = ?';
  db.query(sql, [MaNV], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

module.exports = TaiKhoan;
