const db = require('../config/config');

const FileCongViec = (fcv) => {
  this.MaFile = fcv.MaFile;
  this.MaGV = fcv.MaGV;
  this.TenFile = fcv.TenFile;
  this.DuongDanFile = fcv.DuongDanFile;
  this.NgayTaiLen = fcv.NgayTaiLen;
};

FileCongViec.getAll = (callback) => {
  const sql = 'SELECT * FROM FileCongViec ORDER BY NgayTaiLen DESC';
  db.query(sql, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

FileCongViec.getById = (MaFile, callback) => {
  const sql = 'SELECT * FROM FileCongViec WHERE MaFile = ?';
  db.query(sql, [MaFile], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

FileCongViec.getByGV = (MaGV, callback) => {
  const sql = 'SELECT * FROM FileCongViec WHERE MaGV = ? ORDER BY NgayTaiLen DESC';
  db.query(sql, [MaGV], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

FileCongViec.create = (fcv, callback) => {
  const sql = 'INSERT INTO FileCongViec SET ?';
  db.query(sql, [fcv], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

FileCongViec.update = (fcv, MaFile, callback) => {
  const sql = 'UPDATE FileCongViec SET ? WHERE MaFile = ?';
  db.query(sql, [fcv, MaFile], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

FileCongViec.delete = (MaFile, callback) => {
  const sql = 'DELETE FROM FileCongViec WHERE MaFile = ?';
  db.query(sql, [MaFile], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

module.exports = FileCongViec;
