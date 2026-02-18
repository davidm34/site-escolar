const Models = require('../models/models');
const { gerarLogin, gerarSenha } = require('../utils/geradorCredenciais');

module.exports = {

    async criar(req, res) {
        try {
            const { nome, turma } = req.body;

            if (!nome) {
                return res.status(400).json({ erro: 'O nome é obrigatório para gerar as credenciais.' });
            }

            const loginFinal = gerarLogin(nome);

            const senhaAleatoria = gerarSenha(6);

            const resultado = await Models.createAluno(nome, loginFinal, senhaAleatoria, turma);

            // Retorna sucesso com as credenciais para o Admin copiar
            res.status(201).json({
                mensagem: 'Aluno cadastrado com sucesso!',
                acesso: {
                    login: loginFinal,
                    senha: senhaAleatoria
                },
                detalhes: resultado
            });

        } catch (err) {
            console.error("Erro ao criar aluno:", err);
            res.status(500).json({ erro: 'Erro ao criar o aluno no servidor' });
        }


    },

    async listar(req, res) {
        try {
            const alunosRaw = await Models.getAlunos();


            const alunosComplementos = []

            for (const alunos of alunosRaw) {

                const turma = await Models.turmaAluno(alunos.turma_id)

                alunosComplementos.push({
                    id: alunos.id,
                    nome_completo: alunos.nome_completo,
                    turma: turma.nome,
                    login: alunos.login, 
                    senha: alunos.senha 
                });

            } 

            console.log(alunosComplementos)

            res.json(alunosComplementos);
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
