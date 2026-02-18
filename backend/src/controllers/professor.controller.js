const Models = require('../models/models');
const { gerarLogin, gerarSenha } = require('../utils/geradorCredenciais');

module.exports = {
    
    async criar(req, res) {
        try {
            const { nome, disciplinas, turmas } = req.body;

            if (!nome) {
                return res.status(400).json({ erro: 'O nome é obrigatório para gerar as credenciais.' });
            }

            const loginFinal = gerarLogin(nome);
            const senhaAleatoria = gerarSenha(6);

            const resultado = await Models.createProfessor(nome, loginFinal, senhaAleatoria, disciplinas, turmas);

            // Retorna sucesso com as credenciais para o Admin copiar
            res.status(201).json({
                mensagem: 'Professor cadastrado com sucesso!',
                acesso: {
                    login: loginFinal,
                    senha: senhaAleatoria
                },
                detalhes: resultado
            });

        } catch (err) {
            console.error("Erro ao criar professor:", err);
            res.status(500).json({ erro: 'Erro ao criar o professor no servidor' });
        }
    },
    
    async listar(req, res) {
        try {
            const professoresRaw = await Models.getProfessores();
            
            const professoresCompletos = [];
            
            for (const professor of professoresRaw) {
                
                const disciplinaData = await Models.disciplinasProfessor(professor.id);
                
                const turmaData = await Models.turmasProfessor(professor.id);
                
                professoresCompletos.push({
                    id: professor.id,
                    nome: professor.nome_completo,
                    disciplina: disciplinaData?.nome || 'Não atribuída',
                    turma: turmaData?.nome || 'Não atribuída',
                    login: professor.login,
                    senha: professor.senha
                });
            }
            
            res.json(professoresCompletos);

        } catch (err) {
            console.error("Erro na função listar:", err);
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
