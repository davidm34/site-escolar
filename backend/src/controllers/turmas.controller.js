const TurmasModel = require('../models/turmas.model');

const TurmasController = {

    async criar(req, res) {
        try {
            const { nome, disciplinas } = req.body;

            if (!nome) {
                return res.status(400).json({ erro: 'O nome da turma é obrigatório' });
            }

            // 1. Verifica se a turma já existe
            let turma = await TurmasModel.buscarPorNome(nome);

            // 2. Se não existir, cria (isso evita incrementar o ID à toa se já existir)
            if (!turma) {
                turma = await TurmasModel.criarTurma(nome);
                console.log("Nova turma criada com ID:", turma.id);
            } else {
                console.log("Turma já existente encontrada com ID:", turma.id);
            }

            // 3. Adiciona as disciplinas (o Model já ignora se já estiverem lá)
            if (disciplinas && disciplinas.length > 0) {
                for (const disciplina_id of disciplinas) {
                    // Aqui você pode passar apenas o ID se o frontend enviar [1, 2] 
                    // ou disciplina_id.id se enviar objetos [{id: 1, nome: '... '}]
                    const d_id = typeof disciplina_id === 'object' ? disciplina_id.id : disciplina_id;
                    await TurmasModel.adicionarDisciplina(turma.id, d_id);
                }
            }

            // 4. Busca a lista atualizada de disciplinas para confirmar o que está no banco
            const disciplinasFinais = await TurmasModel.listarDisciplinasDaTurma(turma.id);

            res.status(201).json({
                ...turma,
                disciplinas: disciplinasFinais
            });

        } catch (err) {
            console.error("Erro na operação:", err);
            res.status(500).json({ erro: 'Erro ao processar turma e disciplinas' });
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
