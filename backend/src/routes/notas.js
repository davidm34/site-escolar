const express = require('express');
const router = express.Router();

const autenticar = require('../middlewares/auth.middleware');
const permitir = require('../middlewares/permissao.middleware');
const controller = require('../controllers/notas.controller');

router.get('/', autenticar, controller.listar);
router.post('/', autenticar, permitir('professor', 'administrador'), controller.criar);
router.put('/:id', autenticar, permitir('professor', 'administrador'), controller.atualizar);
router.delete('/:id', autenticar, permitir('administrador'), controller.deletar);

module.exports = router;
