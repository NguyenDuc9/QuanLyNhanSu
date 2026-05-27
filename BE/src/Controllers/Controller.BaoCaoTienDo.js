const BaoCaoTienDo = require('../model/Model.BaoCaoTienDo');

module.exports = {
  getAll: (req, res) => {
    BaoCaoTienDo.getAll((result) => res.send(result));
  },
  getById: (req, res) => {
    BaoCaoTienDo.getById(req.params.MaBaoCao, (result) => res.send(result));
  },
  getByGV: (req, res) => {
    BaoCaoTienDo.getByGV(req.params.MaGV, (result) => res.send(result));
  },
  getLatestByGV: (req, res) => {
    BaoCaoTienDo.getLatestByGV(req.params.MaGV, (result) => res.send(result));
  },
  create: (req, res) => {
    BaoCaoTienDo.create(req.body, (result) => res.send(result));
  },
  update: (req, res) => {
    BaoCaoTienDo.update(req.body, req.params.MaBaoCao, (result) => res.send(result));
  },
  delete: (req, res) => {
    BaoCaoTienDo.delete(req.params.MaBaoCao, (result) => res.send(result));
  },
};
