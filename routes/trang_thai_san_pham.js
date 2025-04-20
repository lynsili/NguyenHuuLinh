var express = require('express');
var router = express.Router();
const Trang_thai_san_phamController = require("../controllers/trang_thai_san_pham.controller");

/* GET all records */
router.get('/', Trang_thai_san_phamController.getAll);
/* GET record by ID */
router.get('/:id', Trang_thai_san_phamController.getById);
/* INSERT a new record */
router.post('/', Trang_thai_san_phamController.insert);
/* UPDATE an existing record */
router.put('/:id', Trang_thai_san_phamController.update);
/* DELETE a record */
router.delete('/:id', Trang_thai_san_phamController.delete);

module.exports = router;
