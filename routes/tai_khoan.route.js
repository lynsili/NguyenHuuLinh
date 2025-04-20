var express = require("express");
var router = express.Router();
const tai_khoanController = require("../controllers/tai_khoan.controller");
router.get("/", tai_khoanController.getAll);
router.get("/:id", tai_khoanController.getById);
router.post("/", tai_khoanController.insert);
router.put("/:id", tai_khoanController.update);
router.delete("/:id", tai_khoanController.delete);
router.post("/login", tai_khoanController.login);
router.post("/api/login", tai_khoanController.login);

module.exports = router;
