var express = require("express");
var router = express.Router();
const Gio_hangController = require("../controllers/gio_hang.controller");

// ✅ Route đặc biệt phải đặt trước

router.get("/user/:userId", Gio_hangController.getByUserId);

router.get("/", Gio_hangController.getAll);
router.get("/:id", Gio_hangController.getById);
router.post("/", Gio_hangController.insert);
router.put("/:id", Gio_hangController.update);
router.delete("/:id", Gio_hangController.delete);

module.exports = router;
