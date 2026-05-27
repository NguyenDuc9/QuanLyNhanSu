const db = require('../config/config');

const NhiemVuTong = (nvtt) => {
  this.MaNVT = nvtt.MaNVT;
  this.TieuDe = nvtt.TieuDe;
  this.MoTa = nvtt.MoTa;
  this.MaPhongBan = nvtt.MaPhongBan;
  this.NgayGiao = nvtt.NgayGiao;
  this.Deadline = nvtt.Deadline;
  this.TrangThai = nvtt.TrangThai;
  this.MaGiamDoc = nvtt.MaGiamDoc;
};

NhiemVuTong.getAll = (callback) => {
  const sql = 'SELECT * FROM NhiemVuTong';
  db.query(sql, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

NhiemVuTong.getById = (MaNVT, callback) => {
  const sql = 'SELECT * FROM NhiemVuTong WHERE MaNVT = ?';
  db.query(sql, [MaNVT], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

NhiemVuTong.getByPhongBan = (MaNV, callback) => {
  const sql =
    'SELECT * FROM NhiemVuTong WHERE MaPhongBan = (select MaPhongBan from NhanVien where MaNV= ?)';
  db.query(sql, [MaNV], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

NhiemVuTong.getByGiamDoc = (MaGiamDoc, callback) => {
  const sql = 'SELECT * FROM NhiemVuTong WHERE MaGiamDoc = ?';
  db.query(sql, [MaGiamDoc], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

NhiemVuTong.create = (nvtt, callback) => {
  const sql = 'INSERT INTO NhiemVuTong SET ?';
  db.query(sql, [nvtt], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

NhiemVuTong.update = (nvtt, MaNVT, callback) => {
  const sql = 'UPDATE NhiemVuTong SET ? WHERE MaNVT = ?';
  db.query(sql, [nvtt, MaNVT], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

NhiemVuTong.updateTrangThai = (MaNVT, TrangThai, callback) => {
  const sql = 'UPDATE NhiemVuTong SET TrangThai = ? WHERE MaNVT = ?';
  db.query(sql, [TrangThai, MaNVT], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

NhiemVuTong.delete = (MaNVT, callback) => {
  const sql = 'DELETE FROM NhiemVuTong WHERE MaNVT = ?';
  db.query(sql, [MaNVT], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

module.exports = NhiemVuTong;
