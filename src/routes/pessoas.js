const express = require('express');
const router = express.Router();
const controller = require('../controllers/pessoas');

router.get('/usuarios', controller.getUsuarios);
router.get('/usuarios/:pessoa_id', controller.getUsuarioId);
router.post('/usuarios/login', controller.postUsuariosLogin);
/* router.get('/:pessoa_id', controller.getId);
router.post('/', controller.post);
router.put('/:pessoa_id', controller.put);
 */
module.exports = router;