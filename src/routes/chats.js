const express = require('express');
const router = express.Router();
const controller = require('../controllers/chats');
const authMiddleware = require('../middlewares/autenticacao');

router.use(authMiddleware);

router.post('/', controller.post);
router.get('/:pessoa_id_rem/:pessoa_id_dest', controller.getPorId);
module.exports = router;