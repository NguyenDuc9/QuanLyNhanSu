const db = require('../config/config');

const Luong = function (luong) {
  this.MaLuong = luong.MaLuong; // có thể bỏ khi insert vì AUTO_INCREMENT
  this.MaNV = luong.MaNV;
  this.Thang = luong.Thang;
  this.Nam = luong.Nam;

  this.LuongCoBan = luong.LuongCoBan;
  this.SoNgayLam = luong.SoNgayLam;
  this.TongPhuCap = luong.TongPhuCap;
  this.TienTangCa = luong.TienTangCa;
  this.TongThuong = luong.TongThuong;
  this.TongPhat = luong.TongPhat;
  this.BaoHiem = luong.BaoHiem;
  this.LuongThucNhan = luong.LuongThucNhan;

  this.NgayTinhLuong = luong.NgayTinhLuong;
};

module.exports = Luong;
Luong.getAll = (callback) => {
  const sql = 'SELECT * FROM BangLuong';
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Luong.getById = (MaLuong, callback) => {
  const sql = 'Select * from BangLuong where MaLuong = ?';
  db.query(sql, [MaLuong], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

Luong.create = (Luong, callback) => {
  const sql = 'insert into BangLuong set ?';
  db.query(sql, [Luong], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};

Luong.update = (Luong, MaLuong, callback) => {
  const sql = 'update BangLuong set ? where MaLuong = ?';
  db.query(sql, [Luong, MaLuong], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};

Luong.delete = (MaLuong, callback) => {
  const sql = 'delete from BangLuong where MaLuong = ?';
  db.query(sql, [MaLuong], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
Luong.getSalaryDetail = (MaNV, Thang, Nam, callback) => {
  const sql = 'CALL sp_TinhLuongNhanVien(?, ?, ?)';

  db.query(sql, [MaNV, Thang, Nam], (err, result) => {
    if (err) {
      console.log('SQL ERROR:', err);
      return callback(err);
    }

    console.log('RESULT:', JSON.stringify(result, null, 2));

    if (!result || !result[0] || result[0].length === 0) {
      return callback(null, null); // không có dữ liệu
    }

    const data = result[0][0];

    const LuongCB = parseFloat(data.LuongCoBan) || 0;
    const SoNgayCong = parseInt(data.SoNgayLam) || 0;
    const TongPhuCap = parseFloat(data.TongPhuCap) || 0;
    const TongThuong = parseFloat(data.TongThuong) || 0;
    const TongPhat = parseFloat(data.TongPhat) || 0;

    const LuongThucNhan =
      (LuongCB / 26) * SoNgayCong + TongPhuCap + TongThuong - TongPhat;
    console.log('LuongThucNhan:', LuongThucNhan);
    callback(null, {
      ...data,
      LuongThucNhan,
    });
  });
};
module.exports = Luong;
