const db = require("../common/db");

const khach_hang = function (data) {
  this.id = data.id;
  this.name = data.name;
  this.email = data.email;
  this.phone = data.phone;
  this.address = data.address;
  this.created_at = data.created_at;
  this.tai_khoan_id = data.tai_khoan_id;
};

khach_hang.getAll = (callback) => {
  const sqlString = "SELECT * FROM khach_hang";
  db.query(sqlString, (err, result) => {
    callback(err, result);
  });
};

khach_hang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM khach_hang WHERE id = ?";
  db.query(sqlString, [id], (err, result) => {
    callback(err, result);
  });
};

khach_hang.getByTaiKhoanId = (tai_khoan_id, callback) => {
  const sql = "SELECT * FROM khach_hang WHERE tai_khoan_id = ?";
  db.query(sql, [tai_khoan_id], callback);
};

khach_hang.insert = (data, callback) => {
  const sqlString = "INSERT INTO khach_hang SET ?";
  db.query(sqlString, data, (err, res) => {
    callback(err, res);
  });
};

khach_hang.update = (data, id, callback) => {
  if (!id) return callback("Thiếu ID");
  const sqlString = "UPDATE khach_hang SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => {
    callback(err, res);
  });
};

khach_hang.delete = (id, callback) => {
  db.query("DELETE FROM khach_hang WHERE id = ?", [id], (err, res) => {
    callback(err, res);
  });
};

module.exports = khach_hang;
