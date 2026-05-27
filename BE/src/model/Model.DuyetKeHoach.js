const db = require('../config/config');

const DuyetKeHoach = (dkh) => {
  this.MaDuyet = dkh.MaDuyet;
  this.MaKH = dkh.MaKH;
  this.MaGiamDoc = dkh.MaGiamDoc;
  this.TrangThai = dkh.TrangThai;
  this.GhiChu = dkh.GhiChu;
  this.NgayDuyet = dkh.NgayDuyet;
};

DuyetKeHoach.getAll = (callback) => {
  const sql = 'SELECT * FROM DuyetKeHoach';
  db.query(sql, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

DuyetKeHoach.getById = (MaDuyet, callback) => {
  const sql = 'SELECT * FROM DuyetKeHoach WHERE MaDuyet = ?';
  db.query(sql, [MaDuyet], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

DuyetKeHoach.getByKH = (MaKH, callback) => {
  const sql = 'SELECT * FROM DuyetKeHoach WHERE MaKH = ? ORDER BY NgayDuyet DESC';
  db.query(sql, [MaKH], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

DuyetKeHoach.getByGiamDoc = (MaGiamDoc, callback) => {
  const sql = 'SELECT * FROM DuyetKeHoach WHERE MaGiamDoc = ? ORDER BY NgayDuyet DESC';
  db.query(sql, [MaGiamDoc], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

DuyetKeHoach.create = (dkh, callback) => {
  const sql = 'INSERT INTO DuyetKeHoach SET ?';
  db.query(sql, [dkh], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

DuyetKeHoach.update = (dkh, MaDuyet, callback) => {
  const sql = 'UPDATE DuyetKeHoach SET ? WHERE MaDuyet = ?';
  db.query(sql, [dkh, MaDuyet], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

DuyetKeHoach.duyet = (MaDuyet, GhiChu, callback) => {
  const sql = 'UPDATE DuyetKeHoach SET TrangThai = ?, GhiChu = ? WHERE MaDuyet = ?';
  db.query(sql, ['DaDuyet', GhiChu, MaDuyet], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

DuyetKeHoach.tuChoi = (MaDuyet, GhiChu, callback) => {
  const sql = 'UPDATE DuyetKeHoach SET TrangThai = ?, GhiChu = ? WHERE MaDuyet = ?';
  db.query(sql, ['TuChoi', GhiChu, MaDuyet], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

DuyetKeHoach.delete = (MaDuyet, callback) => {
  const sql = 'DELETE FROM DuyetKeHoach WHERE MaDuyet = ?';
  db.query(sql, [MaDuyet], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

module.exports = DuyetKeHoach;
