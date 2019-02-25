const express = require('express');
const router = express.Router();
const controller = require('../controllers/oracoes');

router.get('/', controller.get);
router.post('/orar', controller.post_orar);
module.exports = router;