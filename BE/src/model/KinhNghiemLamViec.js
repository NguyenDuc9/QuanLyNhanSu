const db = require('../config/config');

const KinhNghiemLamViec = (kn) => {
  this.MaKN = kn.MaKN;
  this.MaNV = kn.MaNV;
  this.TenCongTy = kn.TenCongTy;
  this.ViTriCongViec = kn.ViTriCongViec;
  this.NgayBatDau = kn.NgayBatDau;
  this.NgayKetThuc = kn.NgayKetThuc;
  this.MoTaCongViec = kn.MoTaCongViec;
  this.CongNgheSuDung = kn.CongNgheSuDung;
};

// ================= GET ALL =================
KinhNghiemLamViec.getAll = (callback) => {
  const sql = 'SELECT * FROM KinhNghiemLamViec';

  db.query(sql, (err, result) => {
    if (err) return callback(err);

    callback(result);
  });
};

// ================= GET BY ID =================
KinhNghiemLamViec.getById = (id, callback) => {
  const sql = 'SELECT * FROM KinhNghiemLamViec WHERE MaKN = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return callback(err);

    callback(result);
  });
};
KinhNghiemLamViec.getByMaNV = (id, callback) => {
  const sql = 'SELECT * FROM KinhNghiemLamViec WHERE MaNV = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return callback(err);

    callback(result);
  });
};

// ================= CREATE =================
KinhNghiemLamViec.create = (data, callback) => {
  const sql = 'INSERT INTO KinhNghiemLamViec SET ?';

  db.query(sql, data, (err, result) => {
    if (err) return callback(err);

    callback(result);
  });
};

// ================= UPDATE =================
KinhNghiemLamViec.update = (id, data, callback) => {
  const sql = `
    UPDATE KinhNghiemLamViec
    SET ?
    WHERE MaKN = ?
  `;

  db.query(sql, [data, id], (err, result) => {
    if (err) return callback(err);

    callback(result);
  });
};

// ================= DELETE =================
KinhNghiemLamViec.delete = (id, callback) => {
  const sql = 'DELETE FROM KinhNghiemLamViec WHERE MaKN = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return callback(err);

    callback(result);
  });
};

module.exports = KinhNghiemLamViec;
