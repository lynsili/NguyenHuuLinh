const db = require("../common/db");
const bcrypt = require("bcrypt");

const Tai_khoan = (tai_khoan) => {
  this.id = tai_khoan.id;
  this.username = tai_khoan.username;
  this.password = tai_khoan.password;
  this.email = tai_khoan.email;
  this.role_id = tai_khoan.role_id;
  this.created_at = tai_khoan.created_at;
  this.updated_at = tai_khoan.updated_at;
};

Tai_khoan.findOne = (username) => {
  const sqlString = "SELECT * FROM tai_khoan WHERE username = ?";
  return new Promise((resolve, reject) => {
    db.query(sqlString, [username], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return resolve(null); // Không tìm thấy người dùng
      }
      resolve(result[0]); // Trả về người dùng nếu tìm thấy
    });
  });
};

Tai_khoan.validateUser = (username, password) => {
  const sqlString = "SELECT * FROM tai_khoan WHERE username = ?";
  return new Promise((resolve, reject) => {
    db.query(sqlString, [username], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return resolve(null); // Không tìm thấy người dùng
      }
      const user = result[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return reject(err);
        }
        if (!isMatch) {
          return resolve(null); // Mật khẩu không khớp
        }
        resolve(user); // Trả về người dùng nếu xác thực thành công
      });
    });
  });
};

Tai_khoan.getById = (id) => {
  const sqlString = "SELECT * FROM tai_khoan WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sqlString, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

Tai_khoan.getAll = () => {
  const sqlString = "SELECT * FROM tai_khoan";
  return new Promise((resolve, reject) => {
    db.query(sqlString, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

Tai_khoan.insert = (tai_khoan) => {
  const sqlString = "INSERT INTO tai_khoan SET ?";
  return new Promise((resolve, reject) => {
    db.query(sqlString, [tai_khoan], (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve({ id: res.insertId, ...tai_khoan });
    });
  });
};

Tai_khoan.update = (tai_khoan, id) => {
  const sqlString = "UPDATE tai_khoan SET ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sqlString, [tai_khoan, id], (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve("Cập nhật tai_khoan id = " + id + " thành công");
    });
  });
};

Tai_khoan.delete = (id) => {
  const sqlString = "DELETE FROM tai_khoan WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sqlString, [id], (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve("Xóa tai_khoan id = " + id + " thành công");
    });
  });
};

module.exports = Tai_khoan;
