const DotTangLuong = require('../model/Model.DotTangLuong');
const DeXuatTangLuong = require('../model/Model.DeXuatTangLuong');

module.exports = {
  // ================= ĐỢT TĂNG LƯƠNG =================

  getAllDotTL: (req, res) => {
    DotTangLuong.getAll((result) => {
      res.send(result);
    });
  },

  getDotTLById: (req, res) => {
    const MaDotTL = req.params.MaDotTL;

    DotTangLuong.getById(MaDotTL, (result) => {
      res.send(result);
    });
  },

  createDotTL: (req, res) => {
    const data = req.body;

    DotTangLuong.create(data, (result) => {
      res.send(result);
    });
  },

  updateDotTL: (req, res) => {
    const MaDotTL = req.params.MaDotTL;
    const data = req.body;

    DotTangLuong.update(data, MaDotTL, (result) => {
      res.send(result);
    });
  },

  deleteDotTL: (req, res) => {
    const MaDotTL = req.params.MaDotTL;

    DotTangLuong.delete(MaDotTL, (result) => {
      res.send(result);
    });
  },

  // ================= ĐỀ XUẤT TĂNG LƯƠNG =================

  getAllDeXuat: (req, res) => {
    DeXuatTangLuong.getAll((result) => {
      res.send(result);
    });
  },

  getDeXuatById: (req, res) => {
    const MaDeXuat = req.params.MaDeXuat;

    DeXuatTangLuong.getById(MaDeXuat, (result) => {
      res.send(result);
    });
  },

  getDeXuatByDotTL: (req, res) => {
    const MaDotTL = req.params.MaDotTL;

    DeXuatTangLuong.getByDotTL(MaDotTL, (result) => {
      res.send(result);
    });
  },

  createDeXuat: (req, res) => {
    const data = req.body;

    DeXuatTangLuong.create(data, (result) => {
      res.send(result);
    });
  },

  updateDeXuat: (req, res) => {
    const MaDeXuat = req.params.MaDeXuat;
    const data = req.body;

    DeXuatTangLuong.update(data, MaDeXuat, (result) => {
      res.send(result);
    });
  },

  deleteDeXuat: (req, res) => {
    const MaDeXuat = req.params.MaDeXuat;

    DeXuatTangLuong.delete(MaDeXuat, (result) => {
      res.send(result);
    });
  },
};
