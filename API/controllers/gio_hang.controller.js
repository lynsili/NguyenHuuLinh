const Gio_hang = require("../models/gio_hang");

module.exports = {
  getAll: (req, res) => {
    Gio_hang.getAll((result) => {
      res.send(result);
    });
  },
  // controller/gioHangController.js
  getByUserId: (req, res) => {
    const userId = req.params.userId;
    Gio_hang.getByUserId(userId, (err, result) => {
      if (err) return res.status(500).send("Lỗi server");
      res.send(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Gio_hang.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    Gio_hang.insert(data, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Gio_hang.update(data, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Gio_hang.delete(id, (result) => {
      res.send(result);
    });
  },
};
