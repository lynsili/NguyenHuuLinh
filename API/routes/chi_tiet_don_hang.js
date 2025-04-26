var express = require('express');
var router = express.Router();
const Chi_tiet_don_hangController = require("../controllers/chi_tiet_don_hang.controller");

/* GET all records */
router.get('/', Chi_tiet_don_hangController.getAll);
/* GET record by ID */
router.get('/:id', Chi_tiet_don_hangController.getById);
/* INSERT a new record */
router.post('/', Chi_tiet_don_hangController.insert);
/* UPDATE an existing record */
router.put('/:id', Chi_tiet_don_hangController.update);
/* DELETE a record */
router.delete('/:id', Chi_tiet_don_hangController.delete);

module.exports = router;
