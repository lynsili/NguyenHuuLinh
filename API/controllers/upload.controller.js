const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Middleware xử lý upload ảnh
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = "uploads/images/";
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

// Hàm xử lý upload hình ảnh
const uploadImage = (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ error: "Không có file ảnh nào được tải lên" });
  }

  const imagePath = `/uploads/images/${req.file.filename}`; // Đường dẫn ảnh vừa tải lên

  return res.json({
    message: "Ảnh đã được tải lên thành công",
    imageUrl: imagePath, // Trả về đường dẫn ảnh
  });
};

module.exports = {
  upload,
  uploadImage,
};
