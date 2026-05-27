const NhiemVuTong = require('../model/Model.NhiemVuTong');

module.exports = {
  getAll: (req, res) => {
    NhiemVuTong.getAll((result) => res.send(result));
  },
  getById: (req, res) => {
    NhiemVuTong.getById(req.params.MaNVT, (result) => res.send(result));
  },
  getByPhongBan: (req, res) => {
    NhiemVuTong.getByPhongBan(req.params.MaNV, (result) => res.send(result));
  },
  getByGiamDoc: (req, res) => {
    NhiemVuTong.getByGiamDoc(req.params.MaGiamDoc, (result) =>
      res.send(result),
    );
  },
  create: (req, res) => {
    NhiemVuTong.create(req.body, (result) => res.send(result));
  },
  update: (req, res) => {
    NhiemVuTong.update(req.body, req.params.MaNVT, (result) =>
      res.send(result),
    );
  },
  updateTrangThai: (req, res) => {
    const { TrangThai } = req.body;
    NhiemVuTong.updateTrangThai(req.params.MaNVT, TrangThai, (result) =>
      res.send(result),
    );
  },
  delete: (req, res) => {
    NhiemVuTong.delete(req.params.MaNVT, (result) => res.send(result));
  },
};
