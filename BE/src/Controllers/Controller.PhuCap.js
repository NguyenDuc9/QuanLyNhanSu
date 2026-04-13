const PhuCap = require('../model/Model.PhuCap');
module.exports = {
  getAll: (req, res) => {
    PhuCap.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const MaPhuCap = req.params.MaPhuCap;
    PhuCap.getById(MaPhuCap, (result) => {
      res.send(result);
    });
  },
  create: (req, res) => {
    const phucap = req.body;
    PhuCap.create(phucap, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const MaPhuCap = req.params.MaPhuCap;
    const phucap = req.body;
    PhuCap.update(phucap, MaPhuCap, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const MaPhuCap = req.params.MaPhuCap;
    console.log(MaPhuCap);
    PhuCap.delete(MaPhuCap, (result) => {
      res.send(result);
    });
  },
};
