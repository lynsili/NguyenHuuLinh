const Hoa_don = require("../models/hoa_don");

module.exports = {
  getAll: (req, res) => {
    Hoa_don.getAll((err, result) => {
      console.log(result);
      res.json(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Hoa_don.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    Hoa_don.insert(data, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Hoa_don.update(data, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Hoa_don.delete(id, (result) => {
      res.send(result);
    });
  },
};
