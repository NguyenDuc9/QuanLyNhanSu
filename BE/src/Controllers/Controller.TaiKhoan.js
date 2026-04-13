const TaiKhoan = require('../model/Model.TaiKhoan');
module.exports = {
  getAll: (req, res) => {
    TaiKhoan.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const MaNV = req.params.MaNV;
    TaiKhoan.getById(MaNV, (result) => {
      res.send(result);
    });
  },
  create: (req, res) => {
    const taikhoan = req.body;
    TaiKhoan.create(taikhoan, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const TenDangNhap = req.params.TenDangNhap;
    const taikhoan = req.body;
    TaiKhoan.update(taikhoan, TenDangNhap, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const TenDangNhap = req.params.TenDangNhap;
    TaiKhoan.delete(TenDangNhap, (result) => {
      res.send(result);
    });
  },
};
