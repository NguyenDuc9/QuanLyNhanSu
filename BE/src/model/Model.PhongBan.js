const db = require('../config/config');
const PhongBan = (phongban) => {
  this.MaPhongBan = phongban.MaPhongBan;
  this.TenPhongBan = phongban.TenPhongBan;
};
PhongBan.getAll = (callback) => {
  const sql = 'SELECT * FROM PhongBan';
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

PhongBan.getById = (MaPhongBan, callback) => {
  const sql = 'Select * from PhongBan where MaPhongBan = ?';
  db.query(sql, [MaPhongBan], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

PhongBan.create = (PhongBan, callback) => {
  const sql = 'insert into PhongBan set ?';
  db.query(sql, [PhongBan], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

PhongBan.update = (PhongBan, MaPhongBan, callback) => {
  const sql = 'update PhongBan set ? where MaPhongBan = ?';
  db.query(sql, [PhongBan, MaPhongBan], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

PhongBan.delete = (MaPhongBan, callback) => {
  const sql = 'delete from PhongBan where MaPhongBan = ?';
  db.query(sql, [MaPhongBan], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

module.exports = PhongBan;
