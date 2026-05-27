const LichSuCongViec = require('../model/Model.LichSuCongViec');

module.exports = {
  getAll: (req, res) => {
    LichSuCongViec.getAll((result) => res.send(result));
  },
  getById: (req, res) => {
    LichSuCongViec.getById(req.params.MaLS, (result) => res.send(result));
  },
  getByGV: (req, res) => {
    LichSuCongViec.getByGV(req.params.MaGV, (result) => res.send(result));
  },
  getByNhanVien: (req, res) => {
    LichSuCongViec.getByNhanVien(req.params.MaNV, (result) => res.send(result));
  },
  create: (req, res) => {
    LichSuCongViec.create(req.body, (result) => res.send(result));
  },
  update: (req, res) => {
    LichSuCongViec.update(req.body, req.params.MaLS, (result) => res.send(result));
  },
  delete: (req, res) => {
    LichSuCongViec.delete(req.params.MaLS, (result) => res.send(result));
  },
};
