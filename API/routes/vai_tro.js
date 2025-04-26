var express = require('express');
var router = express.Router();
const Vai_troController = require("../controllers/vai_tro.controller");

/* GET all records */
router.get('/', Vai_troController.getAll);
/* GET record by ID */
router.get('/:id', Vai_troController.getById);
/* INSERT a new record */
router.post('/', Vai_troController.insert);
/* UPDATE an existing record */
router.put('/:id', Vai_troController.update);
/* DELETE a record */
router.delete('/:id', Vai_troController.delete);

module.exports = router;
