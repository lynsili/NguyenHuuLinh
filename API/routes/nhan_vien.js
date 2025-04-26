var express = require('express');
var router = express.Router();
const Nhan_vienController = require("../controllers/nhan_vien.controller");

/* GET all records */
router.get('/', Nhan_vienController.getAll);
/* GET record by ID */
router.get('/:id', Nhan_vienController.getById);
/* INSERT a new record */
router.post('/', Nhan_vienController.insert);
/* UPDATE an existing record */
router.put('/:id', Nhan_vienController.update);
/* DELETE a record */
router.delete('/:id', Nhan_vienController.delete);

module.exports = router;
