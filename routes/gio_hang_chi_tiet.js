var express = require('express');
var router = express.Router();
const Gio_hang_chi_tietController = require("../controllers/gio_hang_chi_tiet.controller");

/* GET all records */
router.get('/', Gio_hang_chi_tietController.getAll);
/* GET record by ID */
router.get('/:id', Gio_hang_chi_tietController.getById);
/* INSERT a new record */
router.post('/', Gio_hang_chi_tietController.insert);
/* UPDATE an existing record */
router.put('/:id', Gio_hang_chi_tietController.update);
/* DELETE a record */
router.delete('/:id', Gio_hang_chi_tietController.delete);

module.exports = router;
