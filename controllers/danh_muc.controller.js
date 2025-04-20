const Danh_muc = require("../models/danh_muc");

module.exports = {
  getAll: (req, res) => {
    Danh_muc.getAll((err, result) => {
      console.log(result);
      res.json(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Danh_muc.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    Danh_muc.insert(data, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Danh_muc.update(data, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Danh_muc.delete(id, (result) => {
      res.send(result);
    });
  },
};
