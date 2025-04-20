const db = require("../common/db");

const nha_cung_cap = (data) => {
  this.id = data.id;
  this.name = data.name;
  this.contact_person = data.contact_person;
  this.phone = data.phone;
  this.address = data.address;
};

nha_cung_cap.getById = (id, callback) => {
  const sqlString = "SELECT * FROM nha_cung_cap WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

nha_cung_cap.getAll = (callback) => {
  const sqlString = "SELECT * FROM nha_cung_cap";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

nha_cung_cap.insert = (data, callback) => {
  const sqlString = "INSERT INTO nha_cung_cap SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

nha_cung_cap.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE nha_cung_cap SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

nha_cung_cap.delete = (id, callback) => {
  db.query("DELETE FROM nha_cung_cap WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = nha_cung_cap;
