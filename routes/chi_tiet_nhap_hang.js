var express = require('express');
var router = express.Router();
const Chi_tiet_nhap_hangController = require("../controllers/chi_tiet_nhap_hang.controller");

/* GET all records */
router.get('/', Chi_tiet_nhap_hangController.getAll);
/* GET record by ID */
router.get('/:id', Chi_tiet_nhap_hangController.getById);
/* INSERT a new record */
router.post('/', Chi_tiet_nhap_hangController.insert);
/* UPDATE an existing record */
router.put('/:id', Chi_tiet_nhap_hangController.update);
/* DELETE a record */
router.delete('/:id', Chi_tiet_nhap_hangController.delete);

module.exports = router;
