const KeHoachCongViec = require('../model/Model.KeHoachCongViec');

module.exports = {
  getAll: (req, res) => {
    KeHoachCongViec.getAll((result) => res.send(result));
  },
  getById: (req, res) => {
    KeHoachCongViec.getById(req.params.MaKH, (result) => res.send(result));
  },
  getByNVT: (req, res) => {
    KeHoachCongViec.getByNVT(req.params.MaNVT, (result) => res.send(result));
  },
  getByTruongPhong: (req, res) => {
    KeHoachCongViec.getByTruongPhong(req.params.MaTruongPhong, (result) =>
      res.send(result),
    );
  },
  getByTrangThai: (req, res) => {
    KeHoachCongViec.getByTrangThai(req.params.TrangThai, (result) =>
      res.send(result),
    );
  },
  create: (req, res) => {
    KeHoachCongViec.create(req.body, (result) => res.send(result));
  },
  update: (req, res) => {
    console.log(req.body);
    KeHoachCongViec.update(req.body, req.params.MaKH, (result) =>
      res.send(result),
    );
  },
  updateTrangThai: (req, res) => {
    const { TrangThai } = req.body;
    KeHoachCongViec.updateTrangThai(req.params.MaKH, TrangThai, (result) =>
      res.send(result),
    );
  },
  delete: (req, res) => {
    KeHoachCongViec.delete(req.params.MaKH, (result) => res.send(result));
  },
};
