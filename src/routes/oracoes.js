const express = require('express');
const router = express.Router();
const controller = require('../controllers/oracoes');
const authMiddleware = require('../middlewares/autenticacao');

router.get('/', controller.get);

// endpoint que passam pela autenticação
router.use(authMiddleware);
router.post('/orar', controller.post_orar);
module.exports = router;