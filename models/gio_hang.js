const db = require("../common/db");

const gio_hang = function (data) {
  this.id = data.id;
  this.tai_khoan_id = data.tai_khoan_id;
  this.product_id = data.product_id;
  this.quantity = data.quantity;
  this.note = data.note;
  this.created_at = data.created_at;
};

// Lấy tất cả giỏ hàng
gio_hang.getAll = (callback) => {
  const sqlString = "SELECT * FROM gio_hang";
  db.query(sqlString, (err, result) => {
    callback(err, result);
  });
};
gio_hang.getByUserId = (userId, callback) => {
  const sql = `
    SELECT gh.id, gh.product_id, gh.quantity, gh.note, sp.name, sp.price
    FROM gio_hang gh
    JOIN san_pham sp ON gh.product_id = sp.id
    WHERE gh.tai_khoan_id = ?
  `;
  db.query(sql, [userId], (err, result) => callback(err, result));
};

// Lấy giỏ hàng theo ID
gio_hang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM gio_hang WHERE id = ?";
  db.query(sqlString, [id], (err, result) => {
    callback(err, result);
  });
};

// Thêm sản phẩm vào giỏ hàng
gio_hang.insert = (data, callback) => {
  const insertData = {
    tai_khoan_id: data.user_id, // frontend gửi user_id => map sang đúng tên cột
    product_id: data.product_id,
    quantity: data.quantity || 1,
    note: data.note || null,
    created_at: new Date(), // tạo timestamp mới
  };

  console.log("Insert data:", insertData);

  const sqlString = "INSERT INTO gio_hang SET ?";
  db.query(sqlString, insertData, (err, res) => {
    callback(err, res);
  });
};

// Cập nhật giỏ hàng
gio_hang.update = (data, id, callback) => {
  if (!id) return callback("Thiếu ID");

  const updateData = {
    product_id: data.product_id,
    quantity: data.quantity,
    note: data.note,
  };

  const sqlString = "UPDATE gio_hang SET ? WHERE id = ?";
  db.query(sqlString, [updateData, id], (err, res) => {
    callback(err, res);
  });
};

// Xoá sản phẩm khỏi giỏ hàng
gio_hang.delete = (id, callback) => {
  db.query("DELETE FROM gio_hang WHERE id = ?", [id], (err, res) => {
    callback(err, res);
  });
};

module.exports = gio_hang;
