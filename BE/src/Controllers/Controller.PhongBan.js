const PhongBan = require('../model/Model.PhongBan');
module.exports = {
  getAll: (req, res) => {
    PhongBan.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const MaPhongBan = req.params.MaPhongBan;
    PhongBan.getById(MaPhongBan, (result) => {
      res.send(result);
    });
  },
  create: (req, res) => {
    const phongban = req.body;
    PhongBan.create(phongban, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const MaPhongBan = req.params.MaPhongBan;
    const phongban = req.body;
    PhongBan.update(phongban, MaPhongBan, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const MaPhongBan = req.params.MaPhongBan;
    console.log(MaPhongBan);
    PhongBan.delete(MaPhongBan, (result) => {
      res.send(result);
    });
  },
};
