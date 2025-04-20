const Nhan_vien = require("../models/nhan_vien");

module.exports = {
  getAll: (req, res) => {
    Nhan_vien.getAll((err, result) => {
      console.log(result);
      res.json(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Nhan_vien.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    Nhan_vien.insert(data, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Nhan_vien.update(data, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Nhan_vien.delete(id, (result) => {
      res.send(result);
    });
  },
};
