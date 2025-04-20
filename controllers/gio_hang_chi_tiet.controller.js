const Gio_hang_chi_tiet = require("../models/gio_hang_chi_tiet");

module.exports = {
  getAll: (req, res) => {
    Gio_hang_chi_tiet.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Gio_hang_chi_tiet.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    Gio_hang_chi_tiet.insert(data, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Gio_hang_chi_tiet.update(data, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Gio_hang_chi_tiet.delete(id, (result) => {
      res.send(result);
    });
  },
};
