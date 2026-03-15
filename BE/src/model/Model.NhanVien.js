const db = require('../config/config');
const NhanVien = (nhanvien) => {
  this.MaNV = nhanvien.MaNV;
  this.HoTen = nhanvien.HoTen;
  this.NgaySinh = nhanvien.NgaySinh;
  this.GioiTinh = nhanvien.GioiTinh;
  this.DienThoai = nhanvien.DienThoai;
  this.DiaChi = nhanvien.DiaChi;
  this.MaPhongBan = nhanvien.MaPhongBan;
  this.MaChucVu = nhanvien.MaChucVu;
  this.TrangThai = nhanvien.TrangThai;
};
NhanVien.getAll = (callback) => {
  const sql = 'SELECT * FROM NhanVien';
  db.query(sql, (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

NhanVien.getById = (MaNV, callback) => {
  const sql = 'Select * from NhanVien where MaNV = ?';
  db.query(sql, [MaNV], (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

NhanVien.create = (nhanvien, callback) => {
  const sql = 'insert into NhanVien set ?';
  db.query(sql, [nhanvien], (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

NhanVien.update = (nhanvien, MaNV, callback) => {
  const sql = 'update NhanVien set ? where MaNV = ?';
  db.query(sql, [nhanvien, MaNV], (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

NhanVien.delete = (MaNV, callback) => {
  const sql = 'delete from NhanVien where MaNV = ?';
  db.query(sql, [MaNV], (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

module.exports = NhanVien;
