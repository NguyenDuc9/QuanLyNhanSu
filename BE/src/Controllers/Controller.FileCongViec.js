const FileCongViec = require('../model/Model.FileCongViec');

module.exports = {
  getAll: (req, res) => {
    FileCongViec.getAll((result) => res.send(result));
  },
  getById: (req, res) => {
    FileCongViec.getById(req.params.MaFile, (result) => res.send(result));
  },
  getByGV: (req, res) => {
    FileCongViec.getByGV(req.params.MaGV, (result) => res.send(result));
  },
  create: (req, res) => {
    FileCongViec.create(req.body, (result) => res.send(result));
  },
  update: (req, res) => {
    FileCongViec.update(req.body, req.params.MaFile, (result) => res.send(result));
  },
  delete: (req, res) => {
    FileCongViec.delete(req.params.MaFile, (result) => res.send(result));
  },
};
