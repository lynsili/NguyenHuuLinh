const Quyen_han = require("../models/quyen_han");

module.exports = {
  getAll: (req, res) => {
    Quyen_han.getAll((err, result) => {
      console.log(result);
      res.json(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Quyen_han.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    Quyen_han.insert(data, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Quyen_han.update(data, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Quyen_han.delete(id, (result) => {
      res.send(result);
    });
  },
};
