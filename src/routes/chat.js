const express = require('express');
const router = express.Router();
const controller = require('../controllers/chat');
const authMiddleware = require('../middlewares/autenticacao');

router.use(authMiddleware);
router.get('/', controller.get);
router.post('/', controller.post);
module.exports = router;