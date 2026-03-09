const TaiKhoan = require('../model/Model.TaiKhoan');
module.exports = {
  getAll: (req, res) => {
    TaiKhoan.getAll((result) => {
      res.send(result);
    });
  },
};
