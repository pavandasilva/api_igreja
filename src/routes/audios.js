const express = require('express');
const router = express.Router();
const controller = require('../controllers/audios');

router.get('/', controller.get);
router.post('/', controller.get);
module.exports = router;