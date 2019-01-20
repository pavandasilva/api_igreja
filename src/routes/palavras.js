const express = require('express');
const router = express.Router();
const controller = require('../controllers/palavras');

router.get('/:ja_exibida/:qtde', controller.getExibida);

module.exports = router;