const jwt = require("jsonwebtoken");
const Tai_khoan = require("../models/tai_khoan.model"); // Đảm bảo bạn đã kết nối MySQL đúng

// Hàm đăng nhập
const login = async (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra nếu không có username hoặc password
  if (!username || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    // Tìm tài khoản trong cơ sở dữ liệu
    const user = await Tai_khoan.findOne(username);

    if (!user) {
      return res.status(400).json({ message: "Tài khoản không tồn tại." });
    }

    // So sánh mật khẩu người dùng nhập với mật khẩu lưu trong cơ sở dữ liệu (không mã hóa)
    if (password !== user.password) {
      return res.status(400).json({ message: "Mật khẩu không đúng." });
    }

    // Tạo JWT
    const payload = {
      id: user.id,
      username: user.username,
      role_id: user.role_id,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "default_jwt_secret", // Dùng secret key để ký JWT
      { expiresIn: "1h" } // Token có hiệu lực trong 1 giờ
    );

    // Trả về JWT
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role_id: user.role_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server." });
  }
};

module.exports = { login };
