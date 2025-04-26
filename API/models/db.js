// models/db.js
const mysql = require("mysql2");

// Kết nối đến MySQL
const db = mysql.createConnection({
  host: "localhost", // Địa chỉ của database server
  user: "root", // Tên người dùng của MySQL
  password: "250904", // Mật khẩu của người dùng MySQL
  database: "QLbh", // Tên database
});

db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối cơ sở dữ liệu:", err);
    return;
  }
  console.log("Đã kết nối đến MySQL");
});

module.exports = db;
