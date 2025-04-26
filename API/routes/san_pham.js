const express = require("express");
const router = express.Router();
const SanPhamController = require("../controllers/san_pham.controller");
const { upload, uploadImage } = require("../controllers/upload.controller"); // Import controller upload

// ✅ GET all records
router.get("/", SanPhamController.getAll);

// ✅ GET record by ID
router.get("/:id", SanPhamController.getById);

// ✅ INSERT a new record
router.post("/", SanPhamController.insert);

// ✅ UPDATE an existing record
router.put("/:id", SanPhamController.update);

// ✅ DELETE a record
router.delete("/:id", SanPhamController.delete);

// ✅ API upload ảnh sản phẩm → Đổi tên route thành "/image/upload"
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
