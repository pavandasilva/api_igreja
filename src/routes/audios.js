const express = require('express');
const router = express.Router();
const controller = require('../controllers/audios');

router.get('/', controller.get);
router.post('/', controller.post);
router.post_like('/like', controller.post_like);
module.exports = router;