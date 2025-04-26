const Trang_thai_san_pham = require("../models/trang_thai_san_pham");

module.exports = {
  getAll: (req, res) => {
    Trang_thai_san_pham.getAll((err, result) => {
      console.log(result);
      res.json(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Trang_thai_san_pham.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    Trang_thai_san_pham.insert(data, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Trang_thai_san_pham.update(data, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Trang_thai_san_pham.delete(id, (result) => {
      res.send(result);
    });
  },
};
