const db = require('../config/config');
const NghiPhep = function (nghiPhep) {
  this.MaNghiPhep = nghiPhep.MaNghiPhep; // AUTO_INCREMENT → có thể null khi insert
  this.MaNV = nghiPhep.MaNV;

  this.NgayBatDau = nghiPhep.NgayBatDau;
  this.NgayKetThuc = nghiPhep.NgayKetThuc;

  this.LyDo = nghiPhep.LyDo;

  this.TrangThai = nghiPhep.TrangThai || 'Chờ duyệt'; // default DB
  this.NgayTao = nghiPhep.NgayTao || new Date(); // default DB
};
NghiPhep.getAll = (callback) => {
  const sql = 'SELECT * FROM NghiPhep';
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};
NghiPhep.getById = (MaNV, callback) => {
  const sql = 'Select * from NghiPhep where MaNV = ?';
  db.query(sql, [MaNV], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};
NghiPhep.create = (nghiPhep, callback) => {
  const sql = 'insert into NghiPhep set ?';
  db.query(sql, [nghiPhep], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};
NghiPhep.update = (nghiPhep, MaNghiPhep, callback) => {
  const sql = 'update NghiPhep set ? where MaNghiPhep = ?';
  db.query(sql, [nghiPhep, MaNghiPhep], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};
NghiPhep.delete = (MaNghiPhep, callback) => {
  const sql = 'delete from NghiPhep where MaNghiPhep = ?';
  db.query(sql, [MaNghiPhep], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

module.exports = NghiPhep;
