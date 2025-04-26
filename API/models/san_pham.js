const db = require("../common/db");

class SanPham {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.category_id = data.category_id;
    this.price = data.price;
    this.stock = data.stock;
    this.status_id = data.status_id;
    this.created_at = data.created_at;
    this.image_url = data.image_url; // Sửa từ image thành image_url
    this.updated_at = data.updated_at;
  }

  // Lấy sản phẩm theo ID
  static getById(id, callback) {
    if (!id) return callback(new Error("Thiếu ID của sản phẩm"));

    const sqlString = "SELECT * FROM san_pham WHERE id = ?";
    db.query(sqlString, [id], (err, result) => {
      if (err) return callback(err);
      if (result.length === 0)
        return callback(new Error("Không tìm thấy sản phẩm"));
      callback(null, result[0]);
    });
  }

  // Lấy tất cả sản phẩm
  static getAll(callback) {
    const sqlString = "SELECT * FROM san_pham";
    db.query(sqlString, (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  }

  // Thêm sản phẩm mới
  static insert(data, callback) {
    if (!data.name || !data.category_id || !data.price || !data.stock) {
      return callback(new Error("Dữ liệu không hợp lệ"));
    }

    console.log("Dữ liệu sản phẩm khi thêm vào:", data); // Kiểm tra dữ liệu image_url
    const sqlString = "INSERT INTO san_pham SET ?";
    db.query(sqlString, data, (err, res) => {
      if (err) return callback(err);
      callback(null, { id: res.insertId, ...data });
    });
  }

  // Cập nhật sản phẩm
  static update(data, id, callback) {
    if (!id) return callback(new Error("Thiếu ID của sản phẩm"));
    if (!data) return callback(new Error("Không có dữ liệu để cập nhật"));

    const sqlString = "UPDATE san_pham SET ? WHERE id = ?";
    db.query(sqlString, [data, id], (err, res) => {
      if (err) return callback(err);
      if (res.affectedRows === 0)
        return callback(new Error("Không tìm thấy sản phẩm để cập nhật"));
      callback(null, { id, ...data });
    });
  }

  // Xoá sản phẩm
  static delete(id, callback) {
    if (!id) return callback(new Error("Thiếu ID của sản phẩm"));

    const sqlString = "DELETE FROM san_pham WHERE id = ?";
    db.query(sqlString, [id], (err, res) => {
      if (err) return callback(err);
      if (res.affectedRows === 0)
        return callback(new Error("Không tìm thấy sản phẩm để xoá"));
      callback(null, { message: "Xoá sản phẩm thành công" });
    });
  }
}

module.exports = SanPham;
