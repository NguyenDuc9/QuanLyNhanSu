const db = require('../config/config');

const KeHoachCongViec = (khcv) => {
  this.MaKH = khcv.MaKH;
  this.MaNVT = khcv.MaNVT;
  this.TenCongViec = khcv.TenCongViec;
  this.MoTa = khcv.MoTa;
  this.Deadline = khcv.Deadline;
  this.MucDo = khcv.MucDo;
  this.TrangThai = khcv.TrangThai;
  this.MaTruongPhong = khcv.MaTruongPhong;
};

KeHoachCongViec.getAll = (callback) => {
  const sql = 'SELECT * FROM KeHoachCongViec';
  db.query(sql, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

KeHoachCongViec.getById = (MaKH, callback) => {
  const sql = 'SELECT * FROM KeHoachCongViec WHERE MaKH = ?';
  db.query(sql, [MaKH], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

KeHoachCongViec.getByNVT = (MaNVT, callback) => {
  const sql = 'SELECT * FROM KeHoachCongViec WHERE MaNVT = ?';
  db.query(sql, [MaNVT], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

KeHoachCongViec.getByTruongPhong = (MaTruongPhong, callback) => {
  const sql = 'SELECT * FROM KeHoachCongViec WHERE MaTruongPhong = ?';
  db.query(sql, [MaTruongPhong], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

KeHoachCongViec.getByTrangThai = (TrangThai, callback) => {
  const sql = 'SELECT * FROM KeHoachCongViec WHERE TrangThai = ?';
  db.query(sql, [TrangThai], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

KeHoachCongViec.create = (khcv, callback) => {
  const sql = 'INSERT INTO KeHoachCongViec SET ?';
  db.query(sql, [khcv], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

KeHoachCongViec.update = (khcv, MaKH, callback) => {
  const sql = 'UPDATE KeHoachCongViec SET ? WHERE MaKH = ?';
  db.query(sql, [khcv, MaKH], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

KeHoachCongViec.updateTrangThai = (MaKH, TrangThai, callback) => {
  const sql = 'UPDATE KeHoachCongViec SET TrangThai = ? WHERE MaKH = ?';
  db.query(sql, [TrangThai, MaKH], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

KeHoachCongViec.delete = (MaKH, callback) => {
  const sql = 'DELETE FROM KeHoachCongViec WHERE MaKH = ?';
  db.query(sql, [MaKH], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

module.exports = KeHoachCongViec;
