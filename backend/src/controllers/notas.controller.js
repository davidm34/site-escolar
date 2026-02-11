const NotasModel = require('../models/notas.model');

module.exports = {

    async listar(req, res) {
        const { id, cargo } = req.usuario;

        try {
            if (cargo === 'administrador') {
                return res.json(await NotasModel.listarTodas());
            }

            if (cargo === 'aluno') {
                return res.json(await NotasModel.listarPorAluno(id));
            }

            return res.status(403).json({ erro: 'Acesso não permitido' });

        } catch (err) {
            res.status(500).json({ erro: 'Erro ao listar notas' });
        }
    },

    async criar(req, res) {
        const { cargo, id: usuarioId } = req.usuario;
        const { aluno_id, disciplina_id, unidade, nota } = req.body;

        try {
            if (cargo === 'administrador') {
                await NotasModel.inserirNota(aluno_id, disciplina_id, unidade, nota);
                return res.status(201).json({ mensagem: 'Nota criada' });
            }

            if (cargo === 'professor') {
                const permitido = await NotasModel.professorPodeAlterar(
                    usuarioId,
                    aluno_id,
                    disciplina_id
                );

                if (!permitido) {
                    return res.status(403).json({ erro: 'Professor não autorizado' });
                }

                await NotasModel.inserirNota(aluno_id, disciplina_id, unidade, nota);
                return res.status(201).json({ mensagem: 'Nota criada' });
            }

            return res.status(403).json({ erro: 'Acesso negado' });

        } catch (err) {
            res.status(500).json({ erro: 'Erro ao criar nota' });
        }
    },

    async atualizar(req, res) {
        const { cargo, id: usuarioId } = req.usuario;
        const { id } = req.params;
        const { aluno_id, disciplina_id, nota } = req.body;

        try {
            if (cargo === 'administrador') {
                await NotasModel.atualizarNota(id, nota);
                return res.json({ mensagem: 'Nota atualizada' });
            }

            if (cargo === 'professor') {
                const permitido = await NotasModel.professorPodeAlterar(
                    usuarioId,
                    aluno_id,
                    disciplina_id
                );

                if (!permitido) {
                    return res.status(403).json({ erro: 'Professor não autorizado' });
                }

                await NotasModel.atualizarNota(id, nota);
                return res.json({ mensagem: 'Nota atualizada' });
            }

            return res.status(403).json({ erro: 'Acesso negado' });

        } catch (err) {
            res.status(500).json({ erro: 'Erro ao atualizar nota' });
        }
    },

    async deletar(req, res) {
        const { cargo } = req.usuario;
        const { id } = req.params;

        if (cargo !== 'administrador') {
            return res.status(403).json({ erro: 'Somente administrador' });
        }

        try {
            await NotasModel.deletarNota(id);
            res.json({ mensagem: 'Nota removida' });
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao deletar nota' });
        }
    }
};
