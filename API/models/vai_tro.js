const db = require("../common/db");

const vai_tro = (data) => {
  this.id = data.id;
  this.name = data.name;
  this.description = data.description;
};

vai_tro.getById = (id, callback) => {
  const sqlString = "SELECT * FROM vai_tro WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

vai_tro.getAll = (callback) => {
  const sqlString = "SELECT * FROM vai_tro";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

vai_tro.insert = (data, callback) => {
  const sqlString = "INSERT INTO vai_tro SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

vai_tro.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE vai_tro SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

vai_tro.delete = (id, callback) => {
  db.query("DELETE FROM vai_tro WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = vai_tro;
