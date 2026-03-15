const db = require('../config/config');
const HopDong = (hopdong) => {
  this.MaHD = hopdong.MaHD;
  this.MaNV = hopdong.MaNV;
  this.LuongCoBan = hopdong.LuongCoBan;
  this.NgayBatDau = hopdong.NgayBatDau;
  this.NgayKetThuc = hopdong.NgayKetThuc;
};

module.exports = HopDong;
HopDong.getAll = (callback) => {
  const sql = 'SELECT * FROM hopdong';
  db.query(sql, (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

HopDong.getById = (MaNV, callback) => {
  const sql = 'Select * from hopdong where MaNV = ?';
  db.query(sql, [MaNV], (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

HopDong.create = (hopdong, callback) => {
  const sql = 'insert into hopdong set ?';
  db.query(sql, [hopdong], (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

HopDong.update = (hopdong, MaNV, callback) => {
  const sql = 'update hopdong set ? where MaNV = ?';
  db.query(sql, [hopdong, MaNV], (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

HopDong.delete = (MaNV, callback) => {
  const sql = 'delete from hopdong where MaNV = ?';
  db.query(sql, [MaNV], (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

module.exports = HopDong;
