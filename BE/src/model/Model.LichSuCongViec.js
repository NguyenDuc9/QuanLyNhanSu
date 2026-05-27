const db = require('../config/config');

const LichSuCongViec = (lscv) => {
  this.MaLS = lscv.MaLS;
  this.MaGV = lscv.MaGV;
  this.HanhDong = lscv.HanhDong;
  this.NoiDung = lscv.NoiDung;
  this.ThoiGian = lscv.ThoiGian;
  this.MaNV = lscv.MaNV;
};

LichSuCongViec.getAll = (callback) => {
  const sql = 'SELECT * FROM LichSuCongViec ORDER BY ThoiGian DESC';
  db.query(sql, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

LichSuCongViec.getById = (MaLS, callback) => {
  const sql = 'SELECT * FROM LichSuCongViec WHERE MaLS = ?';
  db.query(sql, [MaLS], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

LichSuCongViec.getByGV = (MaGV, callback) => {
  const sql = 'SELECT * FROM LichSuCongViec WHERE MaGV = ? ORDER BY ThoiGian DESC';
  db.query(sql, [MaGV], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

LichSuCongViec.getByNhanVien = (MaNV, callback) => {
  const sql = 'SELECT * FROM LichSuCongViec WHERE MaNV = ? ORDER BY ThoiGian DESC';
  db.query(sql, [MaNV], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

LichSuCongViec.create = (lscv, callback) => {
  const sql = 'INSERT INTO LichSuCongViec SET ?';
  db.query(sql, [lscv], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

LichSuCongViec.update = (lscv, MaLS, callback) => {
  const sql = 'UPDATE LichSuCongViec SET ? WHERE MaLS = ?';
  db.query(sql, [lscv, MaLS], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

LichSuCongViec.delete = (MaLS, callback) => {
  const sql = 'DELETE FROM LichSuCongViec WHERE MaLS = ?';
  db.query(sql, [MaLS], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

module.exports = LichSuCongViec;
