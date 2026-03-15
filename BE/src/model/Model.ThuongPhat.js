const db = require('../config/config');
const ThuongPhat = (thuongphat) => {
  this.MaTP = thuongphat.MaTP;
  this.MaNV = thuongphat.MaNV;
  this.Thang = thuongphat.Thang;
  this.Nam = thuongphat.Nam;
  this.Loai = thuongphat.Loai; // Thuong hoặc Phat
  this.SoTien = thuongphat.SoTien;
  this.LyDo = thuongphat.LyDo;
};

ThuongPhat.getAll = (callback) => {
  const sql = 'SELECT * FROM thuongphat';
  db.query(sql, (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

ThuongPhat.getById = (MaNV, callback) => {
  const sql = 'Select * from thuongphat where MaNV = ?';
  db.query(sql, [MaNV], (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

ThuongPhat.create = (thuongphat, callback) => {
  const sql = 'insert into thuongphat set ?';
  db.query(sql, [thuongphat], (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

ThuongPhat.update = (thuongphat, MaNV, callback) => {
  const sql = 'update thuongphat set ? where MaNV = ?';
  db.query(sql, [thuongphat, MaNV], (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

ThuongPhat.delete = (MaNV, callback) => {
  const sql = 'delete from thuongphat where MaNV = ?';
  db.query(sql, [MaNV], (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

module.exports = ThuongPhat;
