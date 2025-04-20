var express = require('express');
var router = express.Router();
const Don_nhap_hangController = require("../controllers/don_nhap_hang.controller");

/* GET all records */
router.get('/', Don_nhap_hangController.getAll);
/* GET record by ID */
router.get('/:id', Don_nhap_hangController.getById);
/* INSERT a new record */
router.post('/', Don_nhap_hangController.insert);
/* UPDATE an existing record */
router.put('/:id', Don_nhap_hangController.update);
/* DELETE a record */
router.delete('/:id', Don_nhap_hangController.delete);

module.exports = router;
