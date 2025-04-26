const San_pham = require("../models/san_pham");
const { upload } = require("../controllers/upload.controller");
const path = require("path");
const fs = require("fs");

module.exports = {
  // Lấy tất cả sản phẩm
  getAll: (req, res) => {
    San_pham.getAll((err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json(result);
    });
  },

  // Lấy sản phẩm theo ID
  getById: (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "Thiếu ID của sản phẩm" });

    San_pham.getById(id, (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (!result)
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      res.status(200).json(result);
    });
  },

  // Thêm sản phẩm mới (CÓ SỬ DỤNG MIDDLEWARE `upload`)
  insert: [
    upload.single("image"), // Kiểm tra middleware upload ảnh
    (req, res) => {
      console.log("🔥 Middleware Multer đang chạy...");
      console.log("🔥 Body nhận được:", req.body);
      console.log("🔥 File nhận được:", req.file);

      const { name, category_id, price, stock, status_id, description } =
        req.body;

      // Kiểm tra nếu có file ảnh, lấy đường dẫn ảnh. Nếu không có, để null
      const imageUrl = req.file
        ? `/uploads/images/${req.file.filename}`
        : req.body.image_url;

      // Kiểm tra các trường bắt buộc
      if (!name || !category_id || !price || !stock || !status_id) {
        return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
      }

      // Tạo sản phẩm mới
      const newProduct = {
        name,
        category_id,
        price,
        stock,
        status_id,
        image_url: imageUrl, // Lưu đường dẫn ảnh
        description,
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Thêm sản phẩm vào cơ sở dữ liệu
      San_pham.insert(newProduct, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res
          .status(201)
          .json({ message: "Thêm sản phẩm thành công", product: result });
      });
    },
  ],

  // Cập nhật sản phẩm (CÓ SỬ DỤNG MIDDLEWARE `upload`)
  update: [
    upload.single("image"),
    (req, res) => {
      const id = req.params.id;
      if (!id)
        return res.status(400).json({ message: "Thiếu ID của sản phẩm" });

      const { name, category_id, price, stock, status_id, description } =
        req.body;
      // Kiểm tra nếu có ảnh mới, thì lấy đường dẫn mới, nếu không, lấy ảnh cũ từ req.body
      const imageUrl = req.file
        ? `/uploads/images/${req.file.filename}`
        : req.body.image_url;

      // Dữ liệu cập nhật
      const data = {
        name,
        category_id,
        price,
        stock,
        status_id,
        image_url: imageUrl, // Lưu ảnh mới hoặc cũ
        description,
        updated_at: new Date(),
      };

      // Cập nhật sản phẩm vào cơ sở dữ liệu
      San_pham.update(data, id, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res
          .status(200)
          .json({ message: "Cập nhật sản phẩm thành công", product: result });
      });
    },
  ],

  // Xoá sản phẩm
  delete: (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "Thiếu ID của sản phẩm" });

    // Xoá sản phẩm khỏi cơ sở dữ liệu
    San_pham.delete(id, (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.affectedRows === 0)
        return res
          .status(404)
          .json({ message: "Không tìm thấy sản phẩm để xoá" });
      res.status(200).json({ message: "Xoá sản phẩm thành công" });
    });
  },
};
