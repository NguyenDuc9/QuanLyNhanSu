const ChamCong = require('../model/Model.ChamCong');
module.exports = {
  // getAll: (req, res) => {
  //   ChamCong.getAll((result) => {
  //     const data = result.map((nv) => ({
  //       ...nv,
  //       ThoiGian: nv.ThoiGian.toISOString().split('T')[0],
  //     }));
  //     res.send(data);
  //   });
  // },
  getAll: (req, res) => {
    ChamCong.getAll((result) => {
      res.send(result);
    });
  },
  ChamCongHomNay: (req, res) => {
    ChamCong.ChamCongHomNay((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const MaChamCong = req.params.MaChamCong;
    ChamCong.getById(MaChamCong, (result) => {
      res.send(result);
    });
  },
  create: (req, res) => {
    const chamcong = req.body;
    console.log(chamcong);
    ChamCong.create(chamcong, (err, result) => {
      if (err) {
        console.log(err); // vẫn log

        return res.status(400).json({
          message: err.sqlMessage, // 👈 QUAN TRỌNG
        });
      }
      res.send(result);
    });
  },
  update: (req, res) => {
    const MaChamCong = req.params.MaChamCong;
    const chamcong = req.body;
    ChamCong.update(chamcong, MaChamCong, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const MaChamCong = req.params.MaChamCong;
    ChamCong.delete(MaChamCong, (result) => {
      res.send(result);
    });
  },
};
