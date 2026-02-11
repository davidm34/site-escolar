const db = require('../config/database');

const TurmasModel = {

    // Criar turma
    criarTurma: async (nome) => {
        const res = await db.query(
            'INSERT INTO turmas (nome) VALUES ($1) RETURNING *',
            [nome]
        );
        return res.rows[0];
    },

    // Listar todas as turmas
    listarTurmas: async () => {
        const res = await db.query('SELECT * FROM turmas ORDER BY id');
        return res.rows;
    },

    // Buscar turma por ID
    buscarTurmaPorId: async (id) => {
        const res = await db.query(
            'SELECT * FROM turmas WHERE id = $1',
            [id]
        );
        return res.rows[0];
    },

    // Atualizar turma
    atualizarTurma: async (id, nome) => {
        const res = await db.query(
            'UPDATE turmas SET nome = $1 WHERE id = $2 RETURNING *',
            [nome, id]
        );
        return res.rows[0];
    },

    // Deletar turma
    deletarTurma: async (id) => {
        await db.query('DELETE FROM turmas WHERE id = $1', [id]);
    },

    // Adicionar disciplina à turma
    adicionarDisciplina: async (turma_id, disciplina_id) => {
        await db.query(
            `INSERT INTO turmas_disciplinas (turma_id, disciplina_id)
             VALUES ($1, $2)
             ON CONFLICT DO NOTHING`,
            [turma_id, disciplina_id]
        );
    },

    // Remover disciplina da turma
    removerDisciplina: async (turma_id, disciplina_id) => {
        await db.query(
            `DELETE FROM turmas_disciplinas
             WHERE turma_id = $1 AND disciplina_id = $2`,
            [turma_id, disciplina_id]
        );
    },

    // Listar disciplinas de uma turma
    listarDisciplinasDaTurma: async (turma_id) => {
        const res = await db.query(
            `SELECT d.id, d.nome
             FROM turmas_disciplinas td
             JOIN disciplinas d ON d.id = td.disciplina_id
             WHERE td.turma_id = $1`,
            [turma_id]
        );
        return res.rows;
    }

};

module.exports = TurmasModel;
