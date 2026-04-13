const Luong = require('../model/Model.Luong');
module.exports = {
  getAll: (req, res) => {
    Luong.getAll((result) => {
      const data = result.map((nv) => ({
        ...nv,
        NgayTinhLuong: nv.NgayTinhLuong.toISOString().split('T')[0],
      }));
      res.send(data);
    });
  },
  getById: (req, res) => {
    const Maluong = req.params.Maluong;
    Luong.getById(Maluong, (result) => {
      res.send(result);
    });
  },
  create: (req, res) => {
    const luong = {
      MaNV: req.body.MaNV,
      LuongCoBan: req.body.LuongCoBan,
      SoNgayLam: req.body.SoNgayLam,
      TongPhuCap: req.body.TongPhuCap,
      TongThuong: req.body.TongThuong,
      TongPhat: req.body.TongPhat,
      LuongThucNhan: req.body.LuongThucNhan,
    };
    Luong.create(luong, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const Maluong = req.params.Maluong;
    const luong = req.body;
    Luong.update(luong, Maluong, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const Maluong = req.params.MaLuong;
    console.log(Maluong);
    Luong.delete(Maluong, (result) => {
      res.send(result);
    });
  },
  getSalaryDetail: (req, res) => {
    const { maNV, thang, nam } = req.params;

    Luong.getSalaryDetail(maNV, thang, nam, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(404).send({
          message: 'Không có dữ liệu',
        });
      }

      res.send(data);
    });
  },
};
