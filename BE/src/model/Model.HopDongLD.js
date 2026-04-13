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
      return callback(err);
    }
    callback(result);
  });
};

HopDong.getById = (MaHD, callback) => {
  const sql = 'Select * from hopdong where MaHD = ?';
  db.query(sql, [MaHD], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

HopDong.create = (hopdong, callback) => {
  const sql = 'insert into hopdong set ?';
  db.query(sql, [hopdong], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};

HopDong.update = (hopdong, MaHD, callback) => {
  const sql = 'update hopdong set ? where MaHD = ?';
  db.query(sql, [hopdong, MaHD], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};

HopDong.delete = (MaHD, callback) => {
  const sql = 'delete from hopdong where MaHD = ?';
  db.query(sql, [MaHD], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

module.exports = HopDong;
