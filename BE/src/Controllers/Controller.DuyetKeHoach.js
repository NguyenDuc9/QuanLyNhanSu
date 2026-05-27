const DuyetKeHoach = require('../model/Model.DuyetKeHoach');

module.exports = {
  getAll: (req, res) => {
    DuyetKeHoach.getAll((result) => res.send(result));
  },
  getById: (req, res) => {
    DuyetKeHoach.getById(req.params.MaDuyet, (result) => res.send(result));
  },
  getByKH: (req, res) => {
    DuyetKeHoach.getByKH(req.params.MaKH, (result) => res.send(result));
  },
  getByGiamDoc: (req, res) => {
    DuyetKeHoach.getByGiamDoc(req.params.MaGiamDoc, (result) => res.send(result));
  },
  create: (req, res) => {
    DuyetKeHoach.create(req.body, (result) => res.send(result));
  },
  update: (req, res) => {
    DuyetKeHoach.update(req.body, req.params.MaDuyet, (result) => res.send(result));
  },
  duyet: (req, res) => {
    const { GhiChu } = req.body;
    DuyetKeHoach.duyet(req.params.MaDuyet, GhiChu, (result) => res.send(result));
  },
  tuChoi: (req, res) => {
    const { GhiChu } = req.body;
    DuyetKeHoach.tuChoi(req.params.MaDuyet, GhiChu, (result) => res.send(result));
  },
  delete: (req, res) => {
    DuyetKeHoach.delete(req.params.MaDuyet, (result) => res.send(result));
  },
};
