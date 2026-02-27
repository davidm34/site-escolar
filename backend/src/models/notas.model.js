const db = require('../config/database');

module.exports = {

    buscarId: async (alunoId, disciplinaId, unidade) => {
        const resultado = await db.query(
            `SELECT id FROM notas 
            WHERE aluno_id = $1 AND disciplina_id = $2 AND unidade_id = $3`,
            [alunoId, disciplinaId, unidade]
        );

        return resultado.rows.length > 0 ? resultado.rows[0].id : null;
    },

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
            JOIN professores p ON p.turma_id = a.turma_id
            WHERE a.usuario_id = $1            -- ID do Aluno (PK da tabela alunos)
            AND p.disciplina_id = $2 -- ID da Disciplina que o prof leciona
            AND p.usuario_id = $3    -- ID do Usuário/Professor logado
        `, [alunoId, disciplinaId, professorId]);
        
        return res.rowCount > 0;
    },

    inserirNota: async (alunoId, disciplinaId, unidade, nota) => {
        await db.query(
            `INSERT INTO notas (aluno_id, disciplina_id, unidade_id, valor)
             VALUES ($1, $2, $3, $4)`,
            [alunoId, disciplinaId, unidade, nota]
        );
    },

    atualizarNota: async (notaId, nota) => {
        await db.query(
            `UPDATE notas SET valor = $1 WHERE id = $2`,
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
