var express = require('express');
var router = express.Router();
const Vai_tro_quyen_hanController = require("../controllers/vai_tro_quyen_han.controller");

/* GET all records */
router.get('/', Vai_tro_quyen_hanController.getAll);
/* GET record by ID */
router.get('/:id', Vai_tro_quyen_hanController.getById);
/* INSERT a new record */
router.post('/', Vai_tro_quyen_hanController.insert);
/* UPDATE an existing record */
router.put('/:id', Vai_tro_quyen_hanController.update);
/* DELETE a record */
router.delete('/:id', Vai_tro_quyen_hanController.delete);

module.exports = router;
