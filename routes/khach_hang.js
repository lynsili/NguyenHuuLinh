const express = require("express");
const router = express.Router();
const KhachHangController = require("../controllers/khach_hang.controller");

// 📌 Lấy tất cả khách hàng
router.get("/", KhachHangController.getAll);

// 📌 Lấy khách hàng theo ID
router.get("/:id", KhachHangController.getById);

// 📌 Lấy khách hàng theo tài khoản ID
router.get("/by-account/:tai_khoan_id", KhachHangController.getByTaiKhoanId);

// 📌 Thêm khách hàng
router.post("/", KhachHangController.insert);

// 📌 Cập nhật khách hàng
router.put("/:id", KhachHangController.update);

// 📌 Xoá khách hàng
router.delete("/:id", KhachHangController.delete);

module.exports = router;
