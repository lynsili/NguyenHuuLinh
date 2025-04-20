const Chi_tiet_nhap_hang = require("../models/chi_tiet_nhap_hang");

module.exports = {
  getAll: (req, res) => {
    Chi_tiet_nhap_hang.getAll((err, result) => {
      console.log(result);
      res.json(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Chi_tiet_nhap_hang.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    Chi_tiet_nhap_hang.insert(data, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Chi_tiet_nhap_hang.update(data, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Chi_tiet_nhap_hang.delete(id, (result) => {
      res.send(result);
    });
  },
};
