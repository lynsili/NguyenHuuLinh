const db = require("../common/db");

const nhan_vien = (data) => {
  this.id = data.id;
  this.name = data.name;
  this.email = data.email;
  this.phone = data.phone;
  this.position = data.position;
  this.created_at = data.created_at;
};

nhan_vien.getById = (id, callback) => {
  const sqlString = "SELECT * FROM nhan_vien WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

nhan_vien.getAll = (callback) => {
  const sqlString = "SELECT * FROM nhan_vien";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

nhan_vien.insert = (data, callback) => {
  const sqlString = "INSERT INTO nhan_vien SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

nhan_vien.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE nhan_vien SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

nhan_vien.delete = (id, callback) => {
  db.query("DELETE FROM nhan_vien WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = nhan_vien;
