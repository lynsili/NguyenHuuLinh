// File: routes/auth.route.js
const express = require("express");
const { login } = require("../controllers/auth.controller");
const router = express.Router();

// Định nghĩa route POST cho đăng nhập
router.post("/login", login);

module.exports = router;
