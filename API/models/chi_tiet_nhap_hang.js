const db = require("../common/db");

const chi_tiet_nhap_hang = (data) => {
  this.id = data.id;
  this.import_id = data.import_id;
  this.product_id = data.product_id;
  this.quantity = data.quantity;
  this.price = data.price;
};

chi_tiet_nhap_hang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM chi_tiet_nhap_hang WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

chi_tiet_nhap_hang.getAll = (callback) => {
  const sqlString = "SELECT * FROM chi_tiet_nhap_hang";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

chi_tiet_nhap_hang.insert = (data, callback) => {
  const sqlString = "INSERT INTO chi_tiet_nhap_hang SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

chi_tiet_nhap_hang.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE chi_tiet_nhap_hang SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

chi_tiet_nhap_hang.delete = (id, callback) => {
  db.query("DELETE FROM chi_tiet_nhap_hang WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = chi_tiet_nhap_hang;
