const NhanVien = require('../model/Model.NhanVien');
module.exports = {
  getAll: (req, res) => {
    NhanVien.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const MaNV = req.params.MaNV;
    NhanVien.getById(MaNV, (result) => {
      res.send(result);
    });
  },
  create: (req, res) => {
    const nhanvien = req.body;
    NhanVien.create(nhanvien, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const MaNV = req.params.MaNV;
    const nhanvien = req.body;
    NhanVien.update(nhanvien, MaNV, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const MaNV = req.params.MaNV;
    NhanVien.delete(MaNV, (result) => {
      res.send(result);
    });
  },
};
