const Vai_tro_quyen_han = require("../models/vai_tro_quyen_han");

module.exports = {
  getAll: (req, res) => {
    Vai_tro_quyen_han.getAll((err, result) => {
      console.log(result);
      res.json(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Vai_tro_quyen_han.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    Vai_tro_quyen_han.insert(data, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Vai_tro_quyen_han.update(data, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Vai_tro_quyen_han.delete(id, (result) => {
      res.send(result);
    });
  },
};
