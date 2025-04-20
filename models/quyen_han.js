const db = require("../common/db");

const quyen_han = (data) => {
  this.id = data.id;
  this.name = data.name;
  this.description = data.description;
};

quyen_han.getById = (id, callback) => {
  const sqlString = "SELECT * FROM quyen_han WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

quyen_han.getAll = (callback) => {
  const sqlString = "SELECT * FROM quyen_han";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

quyen_han.insert = (data, callback) => {
  const sqlString = "INSERT INTO quyen_han SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

quyen_han.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE quyen_han SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

quyen_han.delete = (id, callback) => {
  db.query("DELETE FROM quyen_han WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = quyen_han;
