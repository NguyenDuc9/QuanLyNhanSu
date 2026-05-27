const KinhNghiemLamViec = require('../model/KinhNghiemLamViec');

module.exports = {
  // ================= GET ALL =================
  getAll: (req, res) => {
    KinhNghiemLamViec.getAll((result) => {
      res.send(result);
    });
  },

  // ================= GET BY ID =================
  getById: (req, res) => {
    const id = req.params.id;

    KinhNghiemLamViec.getById(id, (result) => {
      res.send(result);
    });
  },

  getByMaNV: (req, res) => {
    const id = req.params.id;

    KinhNghiemLamViec.getByMaNV(id, (result) => {
      res.send(result);
    });
  },

  // ================= CREATE =================
  create: (req, res) => {
    const data = req.body;

    KinhNghiemLamViec.create(data, (result) => {
      res.send(result);
    });
  },

  // ================= UPDATE =================
  update: (req, res) => {
    const id = req.params.id;
    const data = req.body;

    KinhNghiemLamViec.update(id, data, (result) => {
      res.send(result);
    });
  },

  // ================= DELETE =================
  delete: (req, res) => {
    const id = req.params.id;

    KinhNghiemLamViec.delete(id, (result) => {
      res.send(result);
    });
  },
};
