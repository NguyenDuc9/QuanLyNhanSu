const db = require('../config/config');

const GiaoViecNhanVien = (gvn) => {
  this.MaGV = gvn.MaGV;
  this.MaKH = gvn.MaKH;
  this.MaNV = gvn.MaNV;
  this.NgayGiao = gvn.NgayGiao;
  this.Deadline = gvn.Deadline;
  this.TrangThai = gvn.TrangThai;
  this.PhanTramHoanThanh = gvn.PhanTramHoanThanh;
};

GiaoViecNhanVien.getAll = (callback) => {
  const sql = 'SELECT * FROM GiaoViecNhanVien';
  db.query(sql, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

GiaoViecNhanVien.getById = (MaGV, callback) => {
  const sql = 'SELECT * FROM GiaoViecNhanVien WHERE MaGV = ?';
  db.query(sql, [MaGV], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

GiaoViecNhanVien.getByKH = (MaKH, callback) => {
  const sql = 'SELECT * FROM GiaoViecNhanVien WHERE MaKH = ?';
  db.query(sql, [MaKH], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

GiaoViecNhanVien.getByNhanVien = (MaNV, callback) => {
  const sql = 'SELECT * FROM GiaoViecNhanVien WHERE MaNV = ?';
  db.query(sql, [MaNV], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};
GiaoViecNhanVien.getByNhanVienvaNV = (MaNV, MaKH, callback) => {
  const sql = `
    SELECT 
        kh.MaKH,
        kh.MaNVT,
        kh.TenCongViec,
        kh.MoTa,
        kh.Deadline AS DeadlineKeHoach,
        kh.MucDo,
        kh.TrangThai AS TrangThaiKeHoach,
        kh.MaTruongPhong,

        gv.MaGV,
        gv.MaNV,
        gv.NgayGiao,
        gv.Deadline AS DeadlineGiaoViec,
        gv.TrangThai AS TrangThaiNhanVien,
        gv.PhanTramHoanThanh

    FROM GiaoViecNhanVien gv
    JOIN KeHoachCongViec kh 
        ON gv.MaKH = kh.MaKH

    WHERE gv.MaNV = ?
      AND gv.MaKH = ?
  `;

  db.query(sql, [MaNV, MaKH], (err, result) => {
    callback(err, result);
  });
};

GiaoViecNhanVien.getByTrangThai = (TrangThai, callback) => {
  const sql = 'SELECT * FROM GiaoViecNhanVien WHERE TrangThai = ?';
  db.query(sql, [TrangThai], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

GiaoViecNhanVien.create = (gvn, callback) => {
  const sql = 'INSERT INTO GiaoViecNhanVien SET ?';
  db.query(sql, [gvn], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

GiaoViecNhanVien.update = (gvn, MaGV, callback) => {
  const sql = 'UPDATE GiaoViecNhanVien SET ? WHERE MaGV = ?';
  db.query(sql, [gvn, MaGV], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

GiaoViecNhanVien.updateTrangThai = (MaGV, TrangThai, callback) => {
  const sql = 'UPDATE GiaoViecNhanVien SET TrangThai = ? WHERE MaGV = ?';
  db.query(sql, [TrangThai, MaGV], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

GiaoViecNhanVien.updatePhanTram = (MaGV, PhanTramHoanThanh, callback) => {
  const sql =
    'UPDATE GiaoViecNhanVien SET PhanTramHoanThanh = ? WHERE MaGV = ?';
  db.query(sql, [PhanTramHoanThanh, MaGV], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

GiaoViecNhanVien.delete = (MaGV, callback) => {
  const sql = 'DELETE FROM GiaoViecNhanVien WHERE MaGV = ?';
  db.query(sql, [MaGV], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

module.exports = GiaoViecNhanVien;
