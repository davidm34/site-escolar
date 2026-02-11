const express = require('express');
const router = express.Router();

const autenticar = require('../middlewares/auth.middleware');
const permitir = require('../middlewares/permissao.middleware');
const controller = require('../controllers/turmas.controller');


// criar turma
router.post('/', autenticar, permitir('administrador'), controller.criar);

// listar turmas
router.get('/', autenticar, permitir('administrador'), controller.listar);

// buscar turma por id
router.get('/:id', autenticar, permitir('administrador'), controller.buscarPorId);

// atualizar turma
router.put('/:id', autenticar, permitir('administrador'), controller.atualizar);

// deletar turma
router.delete('/:id', autenticar, permitir('administrador'), controller.deletar);

// adicionar disciplina à turma
router.post('/disciplina', autenticar, permitir('administrador'), controller.adicionarDisciplina);

// remover disciplina da turma
router.delete('/disciplina', autenticar, permitir('administrador'), controller.removerDisciplina);

// listar disciplinas da turma
router.get('/:id/disciplinas', autenticar, permitir('administrador'), controller.listarDisciplinas);


module.exports = router;
