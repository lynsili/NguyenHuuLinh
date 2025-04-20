const db = require("../common/db");

const danh_muc = (data) => {
  this.id = data.id;
  this.name = data.name;
  this.description = data.description;
};

danh_muc.getById = (id, callback) => {
  const sqlString = "SELECT * FROM danh_muc WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

danh_muc.getAll = (callback) => {
  const sqlString = "SELECT * FROM danh_muc";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

danh_muc.insert = (data, callback) => {
  const sqlString = "INSERT INTO danh_muc SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

danh_muc.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE danh_muc SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

danh_muc.delete = (id, callback) => {
  db.query("DELETE FROM danh_muc WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = danh_muc;
