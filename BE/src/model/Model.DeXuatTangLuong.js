const db = require('../config/config');

const DeXuatTangLuong = (dexuat) => {
  this.MaDeXuat = dexuat.MaDeXuat;
  this.MaDotTL = dexuat.MaDotTL;
  this.MaNV = dexuat.MaNV;
  this.HeSoTang = dexuat.HeSoTang;
  this.LyDo = dexuat.LyDo;
  this.NgayDeXuat = dexuat.NgayDeXuat;
  this.TrangThai = dexuat.TrangThai;
  this.NgayDuyet = dexuat.NgayDuyet;
};

// Lấy tất cả
DeXuatTangLuong.getAll = (callback) => {
  const sql = `
    SELECT dx.*,
           nv.HoTen,
           dt.TenDot
    FROM DeXuatTangLuong dx
    JOIN NhanVien nv ON dx.MaNV = nv.MaNV
    JOIN DotTangLuong dt ON dx.MaDotTL = dt.MaDotTL
    ORDER BY dx.MaDeXuat DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

// Lấy theo mã
DeXuatTangLuong.getById = (MaDeXuat, callback) => {
  const sql = `
    SELECT *
    FROM DeXuatTangLuong
    WHERE MaDeXuat = ?
  `;

  db.query(sql, [MaDeXuat], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

// Lấy theo đợt tăng lương
DeXuatTangLuong.getByDotTL = (MaDotTL, callback) => {
  const sql = `
    SELECT dx.*,
           nv.HoTen
    FROM DeXuatTangLuong dx
    JOIN NhanVien nv ON dx.MaNV = nv.MaNV
    WHERE dx.MaDotTL = ?
  `;

  db.query(sql, [MaDotTL], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

// Thêm
DeXuatTangLuong.create = (dexuat, callback) => {
  const sql = 'INSERT INTO DeXuatTangLuong SET ?';

  db.query(sql, [dexuat], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};

// Sửa
DeXuatTangLuong.update = (dexuat, MaDeXuat, callback) => {
  const sql = `
    UPDATE DeXuatTangLuong
    SET ?
    WHERE MaDeXuat = ?
  `;

  db.query(sql, [dexuat, MaDeXuat], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};

// Duyệt
DeXuatTangLuong.duyet = (MaDeXuat, callback) => {
  const sql = `
    UPDATE DeXuatTangLuong
    SET TrangThai = 'Đã duyệt',
        NgayDuyet = NOW()
    WHERE MaDeXuat = ?
  `;

  db.query(sql, [MaDeXuat], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

// Từ chối
DeXuatTangLuong.tuChoi = (MaDeXuat, callback) => {
  const sql = `
    UPDATE DeXuatTangLuong
    SET TrangThai = 'Từ chối'
    WHERE MaDeXuat = ?
  `;

  db.query(sql, [MaDeXuat], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

// Xóa
DeXuatTangLuong.delete = (MaDeXuat, callback) => {
  const sql = `
    DELETE FROM DeXuatTangLuong
    WHERE MaDeXuat = ?
  `;

  db.query(sql, [MaDeXuat], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

module.exports = DeXuatTangLuong;
