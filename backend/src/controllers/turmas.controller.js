const TurmasModel = require('../models/turmas.models');

const TurmasController = {

    async criar(req, res) {
        try {
            const { nome, disciplinas } = req.body;

            // cria turma
            const turma = await TurmasModel.criarTurma(nome);

            // adiciona disciplinas 
            if (disciplinas && disciplinas.length > 0) {
                for (const disciplina_id of disciplinas) {
                    await TurmasModel.adicionarDisciplina(turma.id, disciplina_id);
                }
            }

            res.status(201).json({
                ...turma,
                disciplinas
            });

        } catch (err) {
            res.status(500).json({ erro: 'Erro ao criar turma' });
        }
    },

    async listar(req, res) {
        try {
            const turmas = await TurmasModel.listarTurmas();
            res.json(turmas);
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao listar turmas' });
        }
    },

    async buscarPorId(req, res) {
        try {
            const turma = await TurmasModel.buscarTurmaPorId(req.params.id);
            if (!turma) return res.status(404).json({ erro: 'Turma não encontrada' });
            res.json(turma);
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao buscar turma' });
        }
    },

    async atualizar(req, res) {
        try {
            const { nome } = req.body;
            const turma = await TurmasModel.atualizarTurma(req.params.id, nome);
            res.json(turma);
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao atualizar turma' });
        }
    },

    async deletar(req, res) {
        try {
            await TurmasModel.deletarTurma(req.params.id);
            res.json({ mensagem: 'Turma deletada' });
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao deletar turma' });
        }
    },

    async adicionarDisciplina(req, res) {
        try {
            const { turma_id, disciplina_id } = req.body;
            await TurmasModel.adicionarDisciplina(turma_id, disciplina_id);
            res.json({ mensagem: 'Disciplina adicionada à turma' });
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao adicionar disciplina' });
        }
    },

    async removerDisciplina(req, res) {
        try {
            const { turma_id, disciplina_id } = req.body;
            await TurmasModel.removerDisciplina(turma_id, disciplina_id);
            res.json({ mensagem: 'Disciplina removida da turma' });
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao remover disciplina' });
        }
    },

    async listarDisciplinas(req, res) {
        try {
            const disciplinas = await TurmasModel.listarDisciplinasDaTurma(req.params.id);
            res.json(disciplinas);
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao listar disciplinas da turma' });
        }
    }

};

module.exports = TurmasController;
