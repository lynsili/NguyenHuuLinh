const Nha_cung_cap = require("../models/nha_cung_cap");

module.exports = {
  getAll: (req, res) => {
    Nha_cung_cap.getAll((err, result) => {
      console.log(result);
      res.json(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Nha_cung_cap.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    Nha_cung_cap.insert(data, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Nha_cung_cap.update(data, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Nha_cung_cap.delete(id, (result) => {
      res.send(result);
    });
  },
};
