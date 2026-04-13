const db = require('../config/config');
const ChamCongChiTiet = (ChamCongChiTiet) => {
  this.MaChiTiet = ChamCongChiTiet.MaChiTiet;
  this.MaNV = ChamCongChiTiet.MaNV;
  this.MaChamCong = ChamCongChiTiet.MaChamCong;
  this.GioVao = ChamCongChiTiet.GioVao;
  this.GioRa = ChamCongChiTiet.GioRa;
};

module.exports = ChamCongChiTiet;
ChamCongChiTiet.getAll = (callback) => {
  const sql = 'SELECT * FROM ChamCongChiTiet';
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

ChamCongChiTiet.getById = (MaChamCongChiTiet, callback) => {
  const sql = 'Select * from ChamCongChiTiet where MaChiTiet = ?';
  db.query(sql, [MaChamCongChiTiet], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

ChamCongChiTiet.create = (ChamCongChiTiet, callback) => {
  const sql = 'insert into ChamCongChiTiet set ?';
  db.query(sql, [ChamCongChiTiet], (err, result) => {
    console.log(ChamCongChiTiet);
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};

ChamCongChiTiet.update = (ChamCongChiTiet, MaChamCongChiTiet, callback) => {
  const sql = 'update ChamCongChiTiet set ? where MaChiTiet = ?';
  db.query(sql, [ChamCongChiTiet, MaChamCongChiTiet], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};

ChamCongChiTiet.delete = (MaChamCongChiTiet, callback) => {
  const sql = 'delete from ChamCongChiTiet where MaChiTie = ?';
  db.query(sql, [MaChamCongChiTiet], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
ChamCongChiTiet.getByIdCC = (MaChamCong, callback) => {
  const sql =
    'SELECT nv.MaNV,nv.HoTen,ct.MaChiTiet,ct.MaChamCong,ct.GioVao,ct.GioRa FROM NhanVien nv LEFT JOIN ChamCongChiTiet ct ON nv.MaNV = ct.MaNV  AND ct.MaChamCong = ?; ';
  db.query(sql, [MaChamCong], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
ChamCongChiTiet.getLichSu = (MaChamCong, callback) => {
  const sql =
    'SELECT nv.MaNV,nv.HoTen,ct.MaChiTiet,ct.MaChamCong,ct.GioVao,ct.GioRa FROM NhanVien nv INNER JOIN ChamCongChiTiet ct ON nv.MaNV = ct.MaNV  AND ct.MaChamCong = ?; ';
  db.query(sql, [MaChamCong], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
module.exports = ChamCongChiTiet;
