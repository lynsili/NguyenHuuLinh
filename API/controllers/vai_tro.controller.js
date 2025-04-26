const Vai_tro = require("../models/vai_tro");

module.exports = {
  getAll: (req, res) => {
    Vai_tro.getAll((err, result) => {
      console.log(result);
      res.json(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Vai_tro.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    Vai_tro.insert(data, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Vai_tro.update(data, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Vai_tro.delete(id, (result) => {
      res.send(result);
    });
  },
};
