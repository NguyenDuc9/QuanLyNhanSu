const HopDong = require('../model/Model.HopDongLD');
module.exports = {
  getAll: (req, res) => {
    HopDong.getAll((result) => {
      const data = result.map((nv) => ({
        ...nv,
        NgayBatDau: nv.NgayBatDau.toISOString().split('T')[0],
        NgayKetThuc: nv.NgayKetThuc.toISOString().split('T')[0],
      }));
      res.send(data);
    });
  },
  getById: (req, res) => {
    const MaHD = req.params.MaHD;
    HopDong.getById(MaHD, (result) => {
      res.send(result);
    });
  },
  create: (req, res) => {
    const MaHD = req.params.MaHD;
    const hopdong = req.body;
    console.log(hopdong);
    HopDong.update(hopdong, MaHD, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const MaHD = req.params.MaHD;
    const hopdong = req.body;
    HopDong.update(hopdong, MaHD, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const MaHD = req.params.MaHD;
    HopDong.delete(MaHD, (result) => {
      res.send(result);
    });
  },
};
