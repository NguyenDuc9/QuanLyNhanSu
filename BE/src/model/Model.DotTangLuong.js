const db = require('../config/config');

const DotTangLuong = (dottangluong) => {
  this.MaDotTL = dottangluong.MaDotTL;
  this.TenDot = dottangluong.TenDot;
  this.NgayTao = dottangluong.NgayTao;
  this.MoTa = dottangluong.MoTa;
  this.TrangThai = dottangluong.TrangThai;
};

// Lấy tất cả
DotTangLuong.getAll = (callback) => {
  const sql = 'SELECT * FROM DotTangLuong ORDER BY MaDotTL DESC';

  db.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

// Lấy theo mã
DotTangLuong.getById = (MaDotTL, callback) => {
  const sql = 'SELECT * FROM DotTangLuong WHERE MaDotTL = ?';

  db.query(sql, [MaDotTL], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

// Thêm
DotTangLuong.create = (dottangluong, callback) => {
  const sql = 'INSERT INTO DotTangLuong SET ?';

  db.query(sql, [dottangluong], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};

// Sửa
DotTangLuong.update = (dottangluong, MaDotTL, callback) => {
  const sql = 'UPDATE DotTangLuong SET ? WHERE MaDotTL = ?';

  db.query(sql, [dottangluong, MaDotTL], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};

// Xóa
DotTangLuong.delete = (MaDotTL, callback) => {
  const sql = 'DELETE FROM DotTangLuong WHERE MaDotTL = ?';

  db.query(sql, [MaDotTL], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

module.exports = DotTangLuong;
