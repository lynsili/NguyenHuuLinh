const db = require("../common/db");

const don_nhap_hang = (data) => {
  this.id = data.id;
  this.supplier_id = data.supplier_id;
  this.employee_id = data.employee_id;
  this.total_price = data.total_price;
  this.created_at = data.created_at;
};

don_nhap_hang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM don_nhap_hang WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

don_nhap_hang.getAll = (callback) => {
  const sqlString = "SELECT * FROM don_nhap_hang";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

don_nhap_hang.insert = (data, callback) => {
  const sqlString = "INSERT INTO don_nhap_hang SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

don_nhap_hang.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE don_nhap_hang SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

don_nhap_hang.delete = (id, callback) => {
  db.query("DELETE FROM don_nhap_hang WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = don_nhap_hang;
