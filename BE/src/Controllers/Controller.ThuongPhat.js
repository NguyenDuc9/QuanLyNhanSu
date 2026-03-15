const ThuongPhat = require('../model/Model.ThuongPhat');
module.exports = {
  getAll: (req, res) => {
    ThuongPhat.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const MaNV = req.params.MaNV;
    ThuongPhat.getById(MaNV, (result) => {
      res.send(result);
    });
  },
  create: (req, res) => {
    const thuongphat = req.body;
    ThuongPhat.create(thuongphat, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const MaNV = req.params.MaNV;
    const thuongphat = req.body;
    ThuongPhat.update(thuongphat, MaNV, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const MaNV = req.params.MaNV;
    ThuongPhat.delete(MaNV, (result) => {
      res.send(result);
    });
  },
};
