const express = require('express');
const router = express.Router();

const autenticar = require('../middlewares/auth.middleware');
const permitir = require('../middlewares/permissao.middleware');
const controller = require('../controllers/professor.controller');

// Apenas ADMIN pode gerenciar professores
router.post('/', autenticar, permitir('administrador'), controller.criar);
router.get('/', autenticar, permitir('administrador'), controller.listar);
router.put('/:id', autenticar, permitir('administrador'), controller.atualizar);
router.delete('/:id', autenticar, permitir('administrador'), controller.deletar);

module.exports = router;
