var express = require('express');
var router = express.Router();
const Hoa_donController = require("../controllers/hoa_don.controller");

/* GET all records */
router.get('/', Hoa_donController.getAll);
/* GET record by ID */
router.get('/:id', Hoa_donController.getById);
/* INSERT a new record */
router.post('/', Hoa_donController.insert);
/* UPDATE an existing record */
router.put('/:id', Hoa_donController.update);
/* DELETE a record */
router.delete('/:id', Hoa_donController.delete);

module.exports = router;
