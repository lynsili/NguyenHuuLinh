const Tai_khoan = require("../models/tai_khoan.model");
const jwt = require("jsonwebtoken"); // Thêm thư viện jsonwebtoken
module.exports = {
  getAll: (req, res) => {
    Tai_khoan.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Tai_khoan.getById(id, (result) => {
      res.send(result);
    });
  },
  insert: (req, res) => {
    const tai_khoan = req.body;
    Tai_khoan.insert(tai_khoan, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const tai_khoan = req.body;
    const id = req.params.id;
    Tai_khoan.update(tai_khoan, id, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const id = req.params.id;
    Tai_khoan.delete(id, (result) => {
      res.send(result);
    });
  },
  login: (req, res) => {
    const { username, password } = req.body;
    Tai_khoan.validateUser(username, password, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
        expiresIn: "1h",
      }); // Tạo JWT
      res.json({ token });
    });
  },
};
