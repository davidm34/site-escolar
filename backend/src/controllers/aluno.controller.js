const Models = require('../models/models');

module.exports = {
    async listar(req, res) {
        try {
            const alunos = await Models.getAlunos();
            res.json(alunos);
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao listar alunos' });
        }
    },

    async buscarPorId(req, res) {
        const { id } = req.params;

        try {
            const aluno = await Models.getAlunoById(id);

            if (!aluno) {
                return res.status(404).json({ erro: 'Aluno não encontrado' });
            }

            res.json(aluno);
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao buscar aluno' });
        }
    },

    async atualizar(req, res) {
        const { id } = req.params;
        const { turma_id } = req.body;

        try {
            await Models.updateAluno(id, turma_id);
            res.json({ mensagem: 'Aluno atualizado com sucesso' });
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao atualizar aluno' });
        }
    },

    async deletar(req, res) {
        const { id } = req.params;

        try {
            await Models.deleteAluno(id);
            res.json({ mensagem: 'Aluno removido com sucesso' });
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao deletar aluno' });
        }
    }
};
