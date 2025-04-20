const db = require("../common/db");

const trang_thai_san_pham = (data) => {
  this.id = data.id;
  this.status_name = data.status_name;
};

trang_thai_san_pham.getById = (id, callback) => {
  const sqlString = "SELECT * FROM trang_thai_san_pham WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

trang_thai_san_pham.getAll = (callback) => {
  const sqlString = "SELECT * FROM trang_thai_san_pham";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

trang_thai_san_pham.insert = (data, callback) => {
  const sqlString = "INSERT INTO trang_thai_san_pham SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

trang_thai_san_pham.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE trang_thai_san_pham SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

trang_thai_san_pham.delete = (id, callback) => {
  db.query("DELETE FROM trang_thai_san_pham WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = trang_thai_san_pham;
