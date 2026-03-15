const HopDong = require('../model/Model.HopDongLD');
module.exports = {
  getAll: (req, res) => {
    HopDong.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const MaNV = req.params.MaNV;
    HopDong.getById(MaNV, (result) => {
      res.send(result);
    });
  },
  create: (req, res) => {
    const hopdong = req.body;
    HopDong.create(hopdong, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const MaNV = req.params.MaNV;
    const hopdong = req.body;
    HopDong.update(hopdong, MaNV, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const MaNV = req.params.MaNV;
    HopDong.delete(MaNV, (result) => {
      res.send(result);
    });
  },
};
