var express = require('express');
var router = express.Router();
const Quyen_hanController = require("../controllers/quyen_han.controller");

/* GET all records */
router.get('/', Quyen_hanController.getAll);
/* GET record by ID */
router.get('/:id', Quyen_hanController.getById);
/* INSERT a new record */
router.post('/', Quyen_hanController.insert);
/* UPDATE an existing record */
router.put('/:id', Quyen_hanController.update);
/* DELETE a record */
router.delete('/:id', Quyen_hanController.delete);

module.exports = router;
