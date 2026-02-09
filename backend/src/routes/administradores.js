const express = require('express');
const router = express.Router();

const autenticar = require('../middlewares/auth.middleware');
const permitir = require('../middlewares/permissao.middleware');
const controller = require('../controllers/administrador.controller');

// Apenas ADMIN (controle total)
router.get('/', autenticar, permitir('administrador'), controller.listar);
router.put('/:id', autenticar, permitir('administrador'), controller.atualizar);
router.delete('/:id', autenticar, permitir('administrador'), controller.deletar);

module.exports = router;
