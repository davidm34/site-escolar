const db = require('./database'); 

const crud_aluno = {

    // Buscar Nota de Matemática
    getGradeMathematics: async () => {
        const res = await db.query('SELECT * from alunos ORDER BY matematica ASC');
        return res.rows[0];
    },

    // Buscar Nota de Português
    getGradePortuguese: async () => {
        const res = await db.query('SELECT * from alunos ORDER BY portugues ASC');
        return res.rows[0];
    },

    // Buscar Nota de História
    getGradeHistory: async () => {
        const res = await db.query('SELECT * from alunos ORDER BY historia ASC');
        return res.rows[0];
    },

    // Buscar Nota de Geografia
    getGradeGeography: async () => {
        const res = await db.query('SELECT * from alunos ORDER BY geografia ASC');
        return res.rows[0];
    },

    // Buscar Nota de Ciências
    getGradeSciences: async () => {
        const res = await db.query('SELECT * from alunos ORDER BY ciencias ASC');
        return res.rows[0];
    },
   


};

module.exports = Models;


const db = require('../database');

exports.criar = async ({ usuario_id, turma_id }) => {
    const { rows } = await db.query(
        `INSERT INTO alunos (usuario_id, turma_id)
         VALUES ($1, $2)
         RETURNING *`,
        [usuario_id, turma_id]
    );
    return rows[0];
};

exports.listar = async () => {
    const { rows } = await db.query(
        `SELECT a.*, u.nome_completo
         FROM alunos a
         JOIN usuarios u ON u.id = a.usuario_id`
    );
    return rows;
};

exports.buscarPorId = async (id) => {
    const { rows } = await db.query(
        `SELECT * FROM alunos WHERE usuario_id = $1`,
        [id]
    );
    return rows[0];
};

exports.atualizar = async (id, dados) => {
    const { turma_id } = dados;
    const { rows } = await db.query(
        `UPDATE alunos
         SET turma_id = $1
         WHERE usuario_id = $2
         RETURNING *`,
        [turma_id, id]
    );
    return rows[0];
};

exports.deletar = async (id) => {
    await db.query(
        `DELETE FROM alunos WHERE usuario_id = $1`,
        [id]
    );
};
