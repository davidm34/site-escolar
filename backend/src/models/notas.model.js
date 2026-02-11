const db = require('../config/database');

module.exports = {

    // ADMIN: listar todas
    listarTodas: async () => {
        const res = await db.query(
            `SELECT * FROM notas`
        );
        return res.rows;
    },
    // ALUNO: listar próprias notas
    listarPorAluno: async (alunoId) => {
        const res = await db.query(
            `SELECT * FROM notas WHERE aluno_id = $1`,
            [alunoId]
        );
        return res.rows;
    },

    // PROFESSOR: valida se ele pode alterar essa nota
    professorPodeAlterar: async (professorId, alunoId, disciplinaId) => {
        const res = await db.query(`
            SELECT 1
            FROM alunos a
            JOIN turma td ON td.turma_id = a.turma_id
            JOIN professores pd ON pd.disciplina_id = td.disciplina_id
            WHERE a.usuario_id = $1
              AND td.disciplinas_id = $2
              AND pd.professores_id = $3
        `, [alunoId, disciplinaId, professorId]);

        return res.rowCount > 0;
    },

    inserirNota: async (alunoId, disciplinaId, unidade, nota) => {
        await db.query(
            `INSERT INTO notas (aluno_id, disciplina_id, unidade, nota)
             VALUES ($1, $2, $3, $4)`,
            [alunoId, disciplinaId, unidade, nota]
        );
    },

    atualizarNota: async (notaId, nota) => {
        await db.query(
            `UPDATE notas SET nota = $1 WHERE id = $2`,
            [nota, notaId]
        );
    },

    deletarNota: async (notaId) => {
        await db.query(
            `DELETE FROM notas WHERE id = $1`,
            [notaId]
        );
    }
};
