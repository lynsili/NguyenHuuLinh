var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const authRoute = require("./routes/auth.route"); // Import route đăng nhập
const multer = require("multer"); // Import multer

var cors = require("cors"); // Import cors
var path = require("path"); // Chỉ khai báo một lần
var fs = require("fs");

var app = express();

// Kết nối với cơ sở dữ liệu (thêm vào)
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "250904", // Thay đổi thành mật khẩu của bạn
  database: "QLbh", // Thay đổi tên database
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.use(
  cors({
    origin: "http://localhost:3001", // Chỉ cho phép từ frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Cho phép các phương thức
    allowedHeaders: ["Content-Type", "Authorization"], // Cho phép các headers cụ thể
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Import tất cả các routes
var nhanvienRouter = require("./routes/nhan_vien");
var sanphamRouter = require("./routes/san_pham");
var donhangRouter = require("./routes/don_hang");
var donnhaphangRouter = require("./routes/don_nhap_hang");
var hoadonRouter = require("./routes/hoa_don");
var khachhangRouter = require("./routes/khach_hang");
var nhacungcapRouter = require("./routes/nha_cung_cap");
var quyenhanRouter = require("./routes/quyen_han");
var taikhoanRouter = require("./routes/tai_khoan.route");
var trangthaisanphamRouter = require("./routes/trang_thai_san_pham");
var vaitroRouter = require("./routes/vai_tro");
var vaitroquyenhanRouter = require("./routes/vai_tro_quyen_han");
var chitietdonhangRouter = require("./routes/chi_tiet_don_hang");
var chitietnhaphangRouter = require("./routes/chi_tiet_nhap_hang");
var danhmucRouter = require("./routes/danh_muc");
var giohangRouter = require("./routes/gio_hang");
var giohangchitietRouter = require("./routes/gio_hang_chi_tiet");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Định tuyến API
app.use("/api/nhan_vien", nhanvienRouter);
app.use("/api/san_pham", sanphamRouter);
app.use("/api/don_hang", donhangRouter);
app.use("/api/don_nhap_hang", donnhaphangRouter);
app.use("/api/hoa_don", hoadonRouter);
app.use("/api/khach_hang", khachhangRouter);
app.use("/api/nha_cung_cap", nhacungcapRouter);
app.use("/api/quyen_han", quyenhanRouter);
app.use("/api/tai_khoan", taikhoanRouter);
app.use("/api/trang_thai_san_pham", trangthaisanphamRouter);
app.use("/api/vai_tro", vaitroRouter);
app.use("/api/vai_tro_quyen_han", vaitroquyenhanRouter);
app.use("/api/chi_tiet_don_hang", chitietdonhangRouter);
app.use("/api/chi_tiet_nhap_hang", chitietnhaphangRouter);
app.use("/api/danh_muc", danhmucRouter);
app.use("/api/auth", authRoute);
app.use("/api/gio_hang", giohangRouter);
app.use("/api/gio_hang_chi_tiet", giohangchitietRouter);

// ✅ Middleware xử lý lỗi 404
app.use(function (req, res, next) {
  res.status(404).json({ error: "Not Found" });
});

// ✅ Middleware xử lý lỗi chung
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/images/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir); // Lưu vào thư mục uploads/images/
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file là timestamp cộng với đuôi file
  },
});

const upload = multer({ storage: storage });

// ✅ Endpoint upload ảnh
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Đường dẫn ảnh vừa tải lên
  const imagePath = `/uploads/images/${req.file.filename}`;

  // Trả về thông tin ảnh đã tải lên
  res.json({ imageUrl: imagePath });
});

// ✅ API để upload ảnh sản phẩm và thêm sản phẩm vào cơ sở dữ liệu
app.post("/api/san_pham", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Đường dẫn của ảnh vừa upload
  const imagePath = `/uploads/images/${req.file.filename}`;

  // Lấy thông tin sản phẩm từ body
  const { name, category_id, price, stock, status_id, description } = req.body;

  // Kiểm tra dữ liệu đã đủ chưa
  if (!name || !category_id || !price || !stock || !status_id || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Chèn sản phẩm mới vào cơ sở dữ liệu, bao gồm đường dẫn ảnh
  const query =
    "INSERT INTO san_pham (name, category_id, price, stock, status_id, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [name, category_id, price, stock, status_id, description, imagePath],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving product to DB");
      }

      // Trả về thông báo thành công và đường dẫn ảnh
      res.json({
        message: "Product created successfully!",
        productId: results.insertId,
        imageUrl: imagePath,
      });
    }
  );
});

// ✅ Phục vụ ảnh từ thư mục 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;
