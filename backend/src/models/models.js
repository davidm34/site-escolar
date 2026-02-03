const db = require('../config/database');

const Models = {
    // Buscar usuário para o Login
    getUsuarioByLogin: async (login) => {
        const res = await db.query('SELECT * FROM usuarios WHERE login = $1', [login]);
        return res.rows[0];
    },

    // Criar Usuário (Lógica para o Registro)
    addUsuarioCompleto: async (nome, cargo, login, senhaHashed, extraInfo = {}) => {
        // Iniciamos uma transação para garantir que o usuário seja criado em ambas as tabelas ou em nenhuma
        const client = await db.pool.connect();
        try {
            await client.query('BEGIN');

            // 1. Insere na tabela central de usuarios
            const userRes = await client.query(
                'INSERT INTO usuarios (nome_completo, cargo, login, senha) VALUES ($1, $2, $3, $4) RETURNING id',
                [nome, cargo, login, senhaHashed]
            );
            const userId = userRes.rows[0].id;

            // 2. Insere na tabela específica baseada no cargo
            if (cargo === 'aluno') {
                await client.query('INSERT INTO alunos (usuario_id, turma_id) VALUES ($1, $2)', [userId, extraInfo.turma_id]);
            } else if (cargo === 'professor') {
                await client.query('INSERT INTO professores (usuario_id) VALUES ($1)', [userId]);
            } else if (cargo === 'administrador') {
                await client.query('INSERT INTO administradores (usuario_id) VALUES ($1)', [userId]);
            }

            await client.query('COMMIT');
            return { id: userId, nome, cargo, login };
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
};

module.exports = Models;