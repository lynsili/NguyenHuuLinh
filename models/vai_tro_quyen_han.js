const db = require("../common/db");

const vai_tro_quyen_han = (data) => {
  this.role_id = data.role_id;
  this.permission_id = data.permission_id;
};

vai_tro_quyen_han.getById = (id, callback) => {
  const sqlString = "SELECT * FROM vai_tro_quyen_han WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

vai_tro_quyen_han.getAll = (callback) => {
  const sqlString = "SELECT * FROM vai_tro_quyen_han";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

vai_tro_quyen_han.insert = (data, callback) => {
  const sqlString = "INSERT INTO vai_tro_quyen_han SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

vai_tro_quyen_han.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE vai_tro_quyen_han SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

vai_tro_quyen_han.delete = (id, callback) => {
  db.query("DELETE FROM vai_tro_quyen_han WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = vai_tro_quyen_han;
