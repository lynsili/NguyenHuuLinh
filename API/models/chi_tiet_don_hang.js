const db = require("../common/db");

function chi_tiet_don_hang(data) {
  this.id = data.id;
  this.order_id = data.order_id;
  this.product_id = data.product_id;
  this.quantity = data.quantity;
  this.price = data.price;
}

// Lấy chi tiết đơn hàng theo ID
chi_tiet_don_hang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM chi_tiet_don_hang WHERE id = ?";
  db.query(sqlString, [id], (err, result) => {
    callback(err, result);
  });
};

// Lấy tất cả chi tiết đơn hàng
chi_tiet_don_hang.getAll = (callback) => {
  const sqlString = "SELECT * FROM chi_tiet_don_hang";
  db.query(sqlString, (err, result) => {
    callback(err, result);
  });
};

// Thêm chi tiết đơn hàng mới
chi_tiet_don_hang.insert = (data, callback) => {
  const sqlString = "INSERT INTO chi_tiet_don_hang SET ?";
  db.query(sqlString, data, (err, res) => {
    callback(err, res);
  });
};

// Cập nhật chi tiết đơn hàng
chi_tiet_don_hang.update = (data, id, callback) => {
  if (!id) return callback("Thiếu ID");
  const sqlString = "UPDATE chi_tiet_don_hang SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => {
    callback(err, res);
  });
};

// Xoá chi tiết đơn hàng
chi_tiet_don_hang.delete = (id, callback) => {
  db.query("DELETE FROM chi_tiet_don_hang WHERE id = ?", [id], (err, res) => {
    callback(err, res);
  });
};

module.exports = chi_tiet_don_hang;
