const db = require('../config/database');

const Models = {
    /* ===============================
       USUÁRIOS / AUTENTICAÇÃO
    ================================ */

    // Buscar usuário para login
    getUsuarioByLogin: async (login) => {
        const res = await db.query(
            'SELECT id, nome_completo, cargo, login, senha FROM usuarios WHERE login = $1',
            [login]
        );
        return res.rows[0];
    },

    // Criar usuário completo (com transação)
    addUsuarioCompleto: async (nome, cargo, login, senha) => {
        const client = await db.pool.connect();

        try {
            await client.query('BEGIN');

            // 1️⃣ Insere em usuarios
            const userRes = await client.query(
                `INSERT INTO usuarios (nome_completo, cargo, login, senha)
                 VALUES ($1, $2, $3, $4)
                 RETURNING id`,
                [nome, cargo, login, senha]
            );

            const userId = userRes.rows[0].id;

            return userId
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    },

    /* ===============================
       ALUNOS
    ================================ */

    getAlunos: async () => {
        const res = await db.query(`
            SELECT u.id, u.nome_completo, a.turma_id
            FROM alunos a
            JOIN usuarios u ON u.id = a.usuario_id
        `);
        return res.rows;
    },

    getAlunoById: async (id) => {
        const res = await db.query(`
            SELECT u.id, u.nome_completo, a.turma_id
            FROM alunos a
            JOIN usuarios u ON u.id = a.usuario_id
            WHERE u.id = $1
        `, [id]);
        return res.rows[0];
    },

    updateAluno: async (id, turma_id) => {
        await db.query(
            'UPDATE alunos SET turma_id = $1 WHERE usuario_id = $2',
            [turma_id, id]
        );
    },

    deleteAluno: async (id) => {
        await db.query(
            'DELETE FROM usuarios WHERE id = $1',
            [id]
        );
        // CASCADE remove de alunos automaticamente
    },

    /* ===============================
       PROFESSORES
    ================================ */

    createProfessor: async (nome, login, senha, disciplinas, turmas) => {
        const client = await db.pool.connect();

        try {
            const id = await client.addUsuarioCompleto(nome, 'professor', login, senha)
            await client.query('BEGIN');

          
            await client.query(
                `INSERT INTO professores (usuario_id) 
                VALUES ($1, $2)
                RETURNING id`,
                [disciplinas, turmas]
            );

            await client.query('COMMIT');

            return id
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    },

    getProfessores: async () => {
        const res = await db.query(`
            SELECT u.id, u.nome_completo
            FROM professores p
            JOIN usuarios u ON u.id = p.usuario_id
        `);
        return res.rows;
    },

    deleteProfessor: async (id) => {
        await db.query(
            'DELETE FROM usuarios WHERE id = $1',
            [id]
        );
    },

    /* ===============================
       ADMINISTRADORES
    ================================ */

    getAdministradores: async () => {
        const res = await db.query(`
            SELECT u.id, u.nome_completo
            FROM administradores a
            JOIN usuarios u ON u.id = a.usuario_id
        `);
        return res.rows;
    }
};

module.exports = Models;
