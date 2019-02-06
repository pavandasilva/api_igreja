const express = require('express');
const router = express.Router();
const controller = require('../controllers/audios');

router.get('/', controller.get);
router.post('/', controller.post);
module.exports = router;