const db = require("../common/db");

function DonHang(data) {
  this.id = data.id;
  this.client_id = data.client_id;
  this.employee_id = data.employee_id;
  this.total_price = data.total_price;
  this.status = data.status;
  this.created_at = data.created_at;
  this.delivery_type = data.delivery_type;
  this.delivery_time = data.delivery_time;
  this.delivery_date = data.delivery_date;
  this.note = data.note;
}

// Lấy đơn hàng theo ID
DonHang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM don_hang WHERE id = ?";
  db.query(sqlString, [id], (err, result) => {
    callback(err, result);
  });
};

// Lấy tất cả đơn hàng
DonHang.getAll = (callback) => {
  const sqlString = "SELECT * FROM don_hang";
  db.query(sqlString, (err, result) => {
    callback(err, result);
  });
};

// Thêm đơn hàng mới
DonHang.insert = (data, callback) => {
  const sqlString = "INSERT INTO don_hang SET ?";
  db.query(sqlString, data, (err, res) => {
    if (err) return callback(err, null);
    callback(null, res);
  });
};

// Cập nhật đơn hàng
DonHang.update = (data, id, callback) => {
  if (!id) return callback("Thiếu ID");
  const sqlString = "UPDATE don_hang SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => {
    callback(err, res);
  });
};

// Xoá đơn hàng
DonHang.delete = (id, callback) => {
  db.query("DELETE FROM don_hang WHERE id = ?", [id], (err, res) => {
    callback(err, res);
  });
};

// Thêm chi tiết đơn hàng
DonHang.insertDetail = (data, callback) => {
  const sqlString = "INSERT INTO chi_tiet_don_hang SET ?";
  db.query(sqlString, data, (err, res) => {
    callback(err, res);
  });
};

module.exports = DonHang;
