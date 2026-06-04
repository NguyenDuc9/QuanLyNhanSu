const db = require('../config/config');
const NhanVien = (nhanvien) => {
  this.MaNV = nhanvien.MaNV;
  this.HoTen = nhanvien.HoTen;
  this.NgaySinh = nhanvien.NgaySinh;
  this.GioiTinh = nhanvien.GioiTinh;
  this.DienThoai = nhanvien.DienThoai;
  this.DiaChi = nhanvien.DiaChi;
  this.MaPhongBan = nhanvien.MaPhongBan;
  this.TrangThai = nhanvien.TrangThai;
};
NhanVien.getAll = (callback) => {
  const sql = 'SELECT * FROM NhanVien';
  db.query(sql, (err, result) => {
    if (err) {
      return callback('Error: ', err);
    }
    callback(result);
  });
};

NhanVien.getById = (MaNV, callback) => {
  const sql = 'Select * from NhanVien where MaNV = ?';
  db.query(sql, [MaNV], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

NhanVien.getByMaPB = (MaPB, callback) => {
  const sql = 'Select * from NhanVien where MaPhongBan = ?';
  db.query(sql, [MaPB], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

NhanVien.create = (nhanvien, callback) => {
  const sql = 'insert into NhanVien set ?';
  db.query(sql, [nhanvien], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};

NhanVien.update = (nhanvien, MaNV, callback) => {
  const sql = 'update NhanVien set ? where MaNV = ?';
  db.query(sql, [nhanvien, MaNV], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(result);
  });
};

NhanVien.delete = (MaNV, callback) => {
  const sql = 'delete from NhanVien where MaNV = ?';
  db.query(sql, [MaNV], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};
NhanVien.getByMaNV = (MaNV, callback) => {
  const sql = `
    SELECT 
        nv.MaNV,
        nv.HoTen,
        pb.TenPhongBan,

        TIMESTAMPDIFF(MONTH, hd.NgayBatDau, CURDATE()) AS ThoiGianLamViec,

        COUNT(CASE WHEN tp.Loai = 'Thuong' THEN 1 END) AS SoLanThuong,
        COUNT(CASE WHEN tp.Loai = 'Phat' THEN 1 END) AS SoLanPhat

    FROM NhanVien nv
    LEFT JOIN HopDong hd ON nv.MaNV = hd.MaNV
    LEFT JOIN ThuongPhat tp ON nv.MaNV = tp.MaNV
    LEFT JOIN PhongBan pb ON nv.MaPhongBan = pb.MaPhongBan

    WHERE nv.MaNV = ?

    GROUP BY 
        nv.MaNV,
        nv.HoTen,
        pb.TenPhongBan,
        hd.NgayBatDau
  `;

  db.query(sql, [MaNV], (err, result) => {
    console.log('Kết quả truy vấn getByMaNV:', result);
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};
module.exports = NhanVien;
