const NghiPhep = require('../model/Model.NghiPhep');

module.exports = {
  getAll: (req, res) => {
    NghiPhep.getAll((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        const data = result.map((np) => ({
          ...np,
          NgayBatDau: np.NgayBatDau.toISOString().split('T')[0],
          NgayKetThuc: np.NgayKetThuc.toISOString().split('T')[0],
          NgayTao: np.NgayTao.toISOString().split('T')[0],
        }));
        res.send(data);
      }
    });
  },
  getById: (req, res) => {
    const MaNV = req.params.MaNV;
    NghiPhep.getById(MaNV, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        const data = result.map((np) => ({
          ...np,
          NgayBatDau: np.NgayBatDau.toISOString().split('T')[0],
          NgayKetThuc: np.NgayKetThuc.toISOString().split('T')[0],
          NgayTao: np.NgayTao.toISOString().split('T')[0],
        }));
        res.send(data);
      }
    });
  },
  create: (req, res) => {
    const nghiPhep = {
      MaNV: req.body.MaNV,
      NgayBatDau: req.body.NgayBatDau,
      NgayKetThuc: req.body.NgayKetThuc,
      LyDo: req.body.LyDo,
      TrangThai: req.body.TrangThai, // Mặc định khi tạo sẽ là "Chờ duyệt"
    };
    console.log('Creating NghiPhep:', nghiPhep);
    NghiPhep.create(nghiPhep, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const MaNghiPhep = req.params.MaNghiPhep;
    const nghiPhep = req.body;
    NghiPhep.update(nghiPhep, MaNghiPhep, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const MaNghiPhep = req.params.MaNghiPhep;
    NghiPhep.delete(MaNghiPhep, (result) => {
      res.send(result);
    });
  },
};
