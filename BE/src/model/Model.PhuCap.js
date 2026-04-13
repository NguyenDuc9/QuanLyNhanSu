const db = require('../config/config');
const PhuCap = (phucap) => {
  this.MaPhuCap = phucap.MaPhuCap;
  this.MaNV = phucap.MaNV;
  this.TenPhuCap = phucap.TenPhuCap;
  this.SoTien = phucap.SoTien;
};
PhuCap.getAll = (callback) => {
  const sql = 'SELECT * FROM PhuCap';
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

PhuCap.getById = (MaPhuCap, callback) => {
  const sql = 'Select * from PhuCap where MaPhuCap = ?';
  db.query(sql, [MaPhuCap], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

PhuCap.create = (PhuCap, callback) => {
  const sql = 'insert into PhuCap set ?';
  db.query(sql, [PhuCap], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

PhuCap.update = (PhuCap, MaPhuCap, callback) => {
  const sql = 'update PhuCap set ? where MaPhuCap = ?';
  db.query(sql, [PhuCap, MaPhuCap], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

PhuCap.delete = (MaPhuCap, callback) => {
  const sql = 'delete from PhuCap where MaPhuCap = ?';
  db.query(sql, [MaPhuCap], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

module.exports = PhuCap;
