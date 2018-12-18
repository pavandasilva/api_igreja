const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientes');

router.get('/', controller.get);
router.get('/:cliente_id', controller.getId);
router.post('/', controller.post);
router.put('/:id', controller.put);

module.exports = router;