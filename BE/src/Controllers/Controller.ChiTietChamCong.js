const ChiTietChamCong = require('../model/Model.ChiTietChamCong');
module.exports = {
  getAll: (req, res) => {
    ChiTietChamCong.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const MaChiTietChamCong = req.params.MaChiTietChamCong;
    ChiTietChamCong.getById(MaChiTietChamCong, (result) => {
      res.send(result);
    });
  },
  create: (req, res) => {
    const chiTietChamCong = req.body;
    ChiTietChamCong.create(chiTietChamCong, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const MaChiTiet = req.params.MaChiTiet;
    const chiTietChamCong = req.body;
    ChiTietChamCong.update(chiTietChamCong, MaChiTiet, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const MaChiTiet = req.params.MaChiTiet;
    ChiTietChamCong.delete(MaChiTiet, (result) => {
      res.send(result);
    });
  },
  getByIdCC: (req, res) => {
    const MaChamCong = req.params.MaChamCong;
    ChiTietChamCong.getByIdCC(MaChamCong, (result) => {
      res.send(result);
    });
  },
  getLichSu: (req, res) => {
    const MaChamCong = req.params.MaChamCong;
    ChiTietChamCong.getLichSu(MaChamCong, (result) => {
      res.send(result);
    });
  },
};
