const GiaoViecNhanVien = require('../model/Model.GiaoViecNhanVien');

module.exports = {
  getAll: (req, res) => {
    GiaoViecNhanVien.getAll((result) => res.send(result));
  },
  getById: (req, res) => {
    GiaoViecNhanVien.getById(req.params.MaGV, (result) => res.send(result));
  },
  getByKH: (req, res) => {
    GiaoViecNhanVien.getByKH(req.params.MaKH, (result) => res.send(result));
  },
  getByNhanVien: (req, res) => {
    GiaoViecNhanVien.getByNhanVien(req.params.MaNV, (result) =>
      res.send(result),
    );
  },
  getByNhanVienvaNV: (req, res) => {
    GiaoViecNhanVien.getByNhanVienvaNV(
      req.params.MaNV,
      req.params.MaKH,
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: 'Lỗi server',
            error: err,
          });
        }

        res.json(result);
      },
    );
  },
  getByTrangThai: (req, res) => {
    GiaoViecNhanVien.getByTrangThai(req.params.TrangThai, (result) =>
      res.send(result),
    );
  },
  create: (req, res) => {
    GiaoViecNhanVien.create(req.body, (result) => res.send(result));
  },
  update: (req, res) => {
    GiaoViecNhanVien.update(req.body, req.params.MaGV, (result) =>
      res.send(result),
    );
  },
  updateTrangThai: (req, res) => {
    const { TrangThai } = req.body;
    GiaoViecNhanVien.updateTrangThai(req.params.MaGV, TrangThai, (result) =>
      res.send(result),
    );
  },
  updatePhanTram: (req, res) => {
    const { PhanTramHoanThanh } = req.body;
    GiaoViecNhanVien.updatePhanTram(
      req.params.MaGV,
      PhanTramHoanThanh,
      (result) => res.send(result),
    );
  },
  delete: (req, res) => {
    GiaoViecNhanVien.delete(req.params.MaGV, (result) => res.send(result));
  },
};
