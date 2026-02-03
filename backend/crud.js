const db = require('./database'); // Certifique-se de que o caminho está correto

const crud = {

    // Listar todos os alunos
    getAllAlunos: async () => {
        const res = await db.query('SELECT * FROM alunos ORDER BY nome_completo ASC');
        return res.rows;
    },

    // Buscar um aluno específico por ID
    getAlunoById: async (id) => {
        const res = await db.query('SELECT * FROM alunos WHERE id = $1', [id]);
        return res.rows[0];
    },

    // Adicionar novo aluno
    addAluno: async (nome, serie) => {
        const queryText = 'INSERT INTO alunos (nome_completo, serie) VALUES ($1, $2) RETURNING *';
        const res = await db.query(queryText, [nome, serie]);
        return res.rows[0];
    },

    // Atualizar aluno (PUT)
    updateAluno: async (id, nome, serie) => {
        const queryText = `
            UPDATE alunos 
            SET nome_completo = $1, serie = $2 
            WHERE id = $3 
            RETURNING *`;
        const res = await db.query(queryText, [nome, serie, id]);
        return res.rows[0];
    },

    // Deletar aluno (DELETE)
    deleteAluno: async (id) => {
        const queryText = 'DELETE FROM alunos WHERE id = $1';
        await db.query(queryText, [id]);
        return { mensagem: "Aluno removido com sucesso" };
    },

    // Listar todos os professores
    getAllProfessores: async () => {
        const res = await db.query('SELECT * FROM professores ORDER BY nome_completo ASC');
        return res.rows;
    },

    // Adicionar novo professor (usando arrays para matérias e séries)
    addProfessor: async (nome, materias, series) => {
        const queryText = `
            INSERT INTO professores (nome_completo, materias, series) 
            VALUES ($1, $2, $3) 
            RETURNING *`;
        const res = await db.query(queryText, [nome, materias, series]);
        return res.rows[0];
    }


};

module.exports = Models;