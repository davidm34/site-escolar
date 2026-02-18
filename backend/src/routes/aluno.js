const express = require('express');
const router = express.Router();

const autenticar = require('../middlewares/auth.middleware');
const permitir = require('../middlewares/permissao.middleware');
const alunoController = require('../controllers/aluno.controller');

router.get('/', autenticar, permitir('professor', 'administrador'), alunoController.listar);
router.post('/', autenticar, permitir('administrador'), alunoController.criar);


module.exports = router;
