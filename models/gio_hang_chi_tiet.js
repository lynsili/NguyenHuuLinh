const db = require("../common/db");

const gio_hang_chi_tiet = (data) => {
  this.id = data.id;
  this.gio_hang_id = data.gio_hang_id;
  this.product_id = data.product_id;
  this.quantity = data.quantity;
  this.da_thanh_toan = data.da_thanh_toan;
};

gio_hang_chi_tiet.getById = (id, callback) => {
  const sqlString = "SELECT * FROM gio_hang_chi_tiet WHERE id = ?";
  db.query(sqlString, [id], (err, result) => {
    callback(err, result);
  });
};

gio_hang_chi_tiet.getAll = (callback) => {
  const sqlString = "SELECT * FROM gio_hang_chi_tiet";
  db.query(sqlString, (err, result) => {
    callback(err, result);
  });
};

gio_hang_chi_tiet.insert = (data, callback) => {
  const sqlString = "INSERT INTO gio_hang_chi_tiet SET ?";
  console.log(data);
  db.query(sqlString, data, (err, res) => {
    callback(err, res);
  });
};

gio_hang_chi_tiet.update = (data, id, callback) => {
  if (!id) return callback("Thiếu ID");
  const sqlString = "UPDATE gio_hang_chi_tiet SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => {
    callback(err, res);
  });
};

gio_hang_chi_tiet.delete = (id, callback) => {
  db.query("DELETE FROM gio_hang_chi_tiet WHERE id = ?", [id], (err, res) => {
    callback(err, res);
  });
};
gio_hang_chi_tiet.findProductInCart = (gio_hang_id, product_id, callback) => {
  const sql =
    "SELECT * FROM gio_hang_chi_tiet WHERE gio_hang_id = ? AND product_id = ?";
  db.query(sql, [gio_hang_id, product_id], (err, result) => {
    callback(err, result[0]);
  });
};

gio_hang_chi_tiet.updateQuantity = (quantity, id, callback) => {
  const sql = "UPDATE gio_hang_chi_tiet SET quantity = ? WHERE id = ?";
  db.query(sql, [quantity, id], (err, res) => {
    callback(err, res);
  });
};

module.exports = gio_hang_chi_tiet;
