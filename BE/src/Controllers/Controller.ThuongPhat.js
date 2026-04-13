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
    const thuongphat = {
      MaNV: req.body.MaNV,
      Thang: req.body.Thang,
      Nam: req.body.Nam,
      Loai: req.body.Loai,
      SoTien: req.body.SoTien,
      LyDo: req.body.LyDo,
    };

    ThuongPhat.create(thuongphat, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const MaTP = req.params.MaTP;
    console.log(MaTP);
    const thuongphat = req.body;
    ThuongPhat.update(thuongphat, MaTP, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const MaTP = req.params.MaTP;
    console.log(MaTP);
    ThuongPhat.delete(MaTP, (result) => {
      res.send(result);
    });
  },
};
