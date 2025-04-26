const db = require("../common/db");

const hoa_don = (data) => {
  this.id = data.id;
  this.order_id = data.order_id;
  this.client_id = data.client_id;
  this.total_price = data.total_price;
  this.created_at = data.created_at;
};

hoa_don.getById = (id, callback) => {
  const sqlString = "SELECT * FROM hoa_don WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

hoa_don.getAll = (callback) => {
  const sqlString = "SELECT * FROM hoa_don";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

hoa_don.insert = (data, callback) => {
  const sqlString = "INSERT INTO hoa_don SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

hoa_don.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE hoa_don SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

hoa_don.delete = (id, callback) => {
  db.query("DELETE FROM hoa_don WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = hoa_don;
