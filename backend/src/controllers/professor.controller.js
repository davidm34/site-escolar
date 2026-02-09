const Models = require('../models/models');

module.exports = {
    async listar(req, res) {
        try {
            const professores = await Models.getProfessores();
            res.json(professores);
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao listar professores' });
        }
    },

    async atualizar(req, res) {
        const { id } = req.params;
        const { nome_completo } = req.body;

        try {
            await Models.updateProfessor(id, nome_completo);
            res.json({ mensagem: 'Professor atualizado com sucesso' });
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao atualizar professor' });
        }
    },

    async deletar(req, res) {
        const { id } = req.params;

        try {
            await Models.deleteProfessor(id);
            res.json({ mensagem: 'Professor removido com sucesso' });
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao deletar professor' });
        }
    }
};
