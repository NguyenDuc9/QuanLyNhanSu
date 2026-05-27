const db = require('../config/config');

const BaoCaoTienDo = (bctd) => {
  this.MaBaoCao = bctd.MaBaoCao;
  this.MaGV = bctd.MaGV;
  this.NoiDung = bctd.NoiDung;
  this.PhanTramHoanThanh = bctd.PhanTramHoanThanh;
  this.FileBaoCao = bctd.FileBaoCao;
  this.NgayBaoCao = bctd.NgayBaoCao;
};

BaoCaoTienDo.getAll = (callback) => {
  const sql = 'SELECT * FROM BaoCaoTienDo ORDER BY NgayBaoCao DESC';
  db.query(sql, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

BaoCaoTienDo.getById = (MaBaoCao, callback) => {
  const sql = 'SELECT * FROM BaoCaoTienDo WHERE MaBaoCao = ?';
  db.query(sql, [MaBaoCao], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

BaoCaoTienDo.getByGV = (MaGV, callback) => {
  const sql = 'SELECT * FROM BaoCaoTienDo WHERE MaGV = ? ORDER BY NgayBaoCao DESC';
  db.query(sql, [MaGV], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

BaoCaoTienDo.getLatestByGV = (MaGV, callback) => {
  const sql = 'SELECT * FROM BaoCaoTienDo WHERE MaGV = ? ORDER BY NgayBaoCao DESC LIMIT 1';
  db.query(sql, [MaGV], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

BaoCaoTienDo.create = (bctd, callback) => {
  const sql = 'INSERT INTO BaoCaoTienDo SET ?';
  db.query(sql, [bctd], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

BaoCaoTienDo.update = (bctd, MaBaoCao, callback) => {
  const sql = 'UPDATE BaoCaoTienDo SET ? WHERE MaBaoCao = ?';
  db.query(sql, [bctd, MaBaoCao], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

BaoCaoTienDo.delete = (MaBaoCao, callback) => {
  const sql = 'DELETE FROM BaoCaoTienDo WHERE MaBaoCao = ?';
  db.query(sql, [MaBaoCao], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

module.exports = BaoCaoTienDo;
