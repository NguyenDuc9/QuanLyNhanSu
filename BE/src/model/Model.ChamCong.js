const db = require('../config/config');
const ChamCong = (chamcong) => {
  this.MaChamCong = chamcong.MaChamCong;
  this.CaLamViec = chamcong.CaLamViec;
  this.ThoiGian = chamcong.ThoiGian;
};

module.exports = ChamCong;
ChamCong.getAll = (callback) => {
  const sql = 'SELECT * FROM ChamCong';
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
ChamCong.ChamCongHomNay = (callback) => {
  const sql = 'SELECT * FROM ChamCong where ThoiGian = CURDATE()';
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    console.log(result);
    callback(result);
  });
};
ChamCong.getById = (MaChamCong, callback) => {
  const sql = 'Select * from ChamCong where MaChamCong = ?';
  db.query(sql, [MaChamCong], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

ChamCong.create = (ChamCong, callback) => {
  const sql = 'insert into ChamCong set ?';

  db.query(sql, [ChamCong], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err, null); // ✅ đúng
    }

    callback(null, result); // ✅ đúng chuẩn Node.js
  });
};

ChamCong.update = (ChamCong, MaChamCong, callback) => {
  const sql = 'update ChamCong set ? where MaChamCong = ?';
  db.query(sql, [ChamCong, MaChamCong], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};

ChamCong.delete = (MaChamCong, callback) => {
  const sql = 'delete from ChamCong where MaChamCong = ?';
  db.query(sql, [MaChamCong], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

module.exports = ChamCong;
