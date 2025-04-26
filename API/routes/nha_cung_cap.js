var express = require('express');
var router = express.Router();
const Nha_cung_capController = require("../controllers/nha_cung_cap.controller");

/* GET all records */
router.get('/', Nha_cung_capController.getAll);
/* GET record by ID */
router.get('/:id', Nha_cung_capController.getById);
/* INSERT a new record */
router.post('/', Nha_cung_capController.insert);
/* UPDATE an existing record */
router.put('/:id', Nha_cung_capController.update);
/* DELETE a record */
router.delete('/:id', Nha_cung_capController.delete);

module.exports = router;
