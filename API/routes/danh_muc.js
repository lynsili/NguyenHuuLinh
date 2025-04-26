var express = require('express');
var router = express.Router();
const Danh_mucController = require("../controllers/danh_muc.controller");

/* GET all records */
router.get('/', Danh_mucController.getAll);
/* GET record by ID */
router.get('/:id', Danh_mucController.getById);
/* INSERT a new record */
router.post('/', Danh_mucController.insert);
/* UPDATE an existing record */
router.put('/:id', Danh_mucController.update);
/* DELETE a record */
router.delete('/:id', Danh_mucController.delete);

module.exports = router;
