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
    addUsuarioCompleto: async (nome, cargo, login, senhaHashed, extraInfo = {}) => {
        const client = await db.pool.connect();

        try {
            await client.query('BEGIN');

            // 1️⃣ Insere em usuarios
            const userRes = await client.query(
                `INSERT INTO usuarios (nome_completo, cargo, login, senha)
                 VALUES ($1, $2, $3, $4)
                 RETURNING id`,
                [nome, cargo, login, senhaHashed]
            );

            const userId = userRes.rows[0].id;

            // 2️⃣ Insere conforme cargo
            if (cargo === 'aluno') {
                await client.query(
                    'INSERT INTO alunos (usuario_id, turma_id) VALUES ($1, $2)',
                    [userId, extraInfo.turma_id]
                );
            }

            if (cargo === 'professor') {
                await client.query(
                    'INSERT INTO professores (usuario_id) VALUES ($1)',
                    [userId]
                );
            }

            if (cargo === 'administrador') {
                await client.query(
                    'INSERT INTO administradores (usuario_id) VALUES ($1)',
                    [userId]
                );
            }

            await client.query('COMMIT');

            return { id: userId, nome, cargo, login };

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
