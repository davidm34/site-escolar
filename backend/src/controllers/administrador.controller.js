const Models = require('../models/models');

module.exports = {
    async listar(req, res) {
        try {
            const administradores = await Models.getAdministradores();
            res.json(administradores);
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao listar administradores' });
        }
    },

    async atualizar(req, res) {
        const { id } = req.params;
        const { nome_completo } = req.body;

        try {
            await Models.updateAdministrador(id, nome_completo);
            res.json({ mensagem: 'Administrador atualizado com sucesso' });
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao atualizar administrador' });
        }
    },

    async deletar(req, res) {
        const { id } = req.params;

        try {
            await Models.deleteProfessor(id);
            // DELETE em usuarios remove o administrador por cascade
            res.json({ mensagem: 'Administrador removido com sucesso' });
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao deletar administrador' });
        }
    }
};
