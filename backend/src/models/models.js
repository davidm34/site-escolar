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
    addUsuarioCompleto: async (nome, cargo, login, senhaHashed, clientExterno = null) => {
        // Se recebeu um client, usa ele. Se não, pega um novo do pool.
        const client = clientExterno || await db.pool.connect();

        try {
            // Só inicia transação se não for um client vindo de fora
            if (!clientExterno) await client.query('BEGIN');

            const userRes = await client.query(
                `INSERT INTO usuarios (nome_completo, cargo, login, senha)
                VALUES ($1, $2, $3, $4)
                RETURNING id`,
                [nome, cargo, login, senhaHashed]
            );

            const userId = userRes.rows[0].id;

            if (!clientExterno) await client.query('COMMIT');
            
            return { id: userId }; // Retorna o objeto com o ID
        } catch (err) {
            if (!clientExterno) await client.query('ROLLBACK');
            throw err;
        } finally {
            // Só libera o client se ele foi criado aqui dentro
            if (!clientExterno) client.release();
        }
    },

    getUsuarioById: async (id) => {
        try {
            const res = await db.query(
                'SELECT id, nome_completo, cargo, login FROM usuarios WHERE id = $1',
                [id]
            );
            
            // Retorna o utilizador se encontrado, ou undefined se não existir
            return res.rows[0]; 
        } catch (err) {
            console.error("Erro ao buscar utilizador por ID:", err.message);
            throw err;
        }
    },

    /* ===============================
       ALUNOS
    ================================ */

    createAluno: async (nome, login, senha, turmas) => {
        const client = await db.pool.connect();
        try {
            await client.query('BEGIN');

            // Passamos o 'client' como o 5º argumento para manter a mesma transação
            const usuario = await Models.addUsuarioCompleto(nome, 'aluno', login, senha, client);
            const id = usuario.id;

            await client.query(
                `INSERT INTO alunos (usuario_id, turma_id) 
                VALUES ($1, $2)`,
                [id, turmas]
            );

            await client.query('COMMIT');
            return id;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    },   

    getAlunos: async () => {
        const res = await db.query(`
            SELECT u.id, u.nome_completo, u.login, u.senha, a.turma_id
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

    turmaAluno: async(turmaId) => {
        const turma = await db.query('SELECT nome FROM turmas WHERE id = $1', [turmaId]);
        return turma.rows[0];
    },

    /* ===============================
       PROFESSORES
    ================================ */

    createProfessor: async (nome, login, senha, disciplinas, turmas) => {
        const client = await db.pool.connect();
        try {
            await client.query('BEGIN');

            // Passamos o 'client' como o 5º argumento para manter a mesma transação
            const usuario = await Models.addUsuarioCompleto(nome, 'professor', login, senha, client);
            const id = usuario.id;

            await client.query(
                `INSERT INTO professores (usuario_id, disciplina_id, turma_id) 
                VALUES ($1, $2, $3)`,
                [id, disciplinas, turmas]
            );

            await client.query('COMMIT');
            return id;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    },

    getProfessores: async () => {
        const res = await db.query(`
            SELECT u.id, u.nome_completo, u.login, u.senha
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

    disciplinasProfessor: async (id) => {
        // Primeiro, pega o disciplina_id do professor
        const result = await db.query('SELECT disciplina_id FROM professores WHERE usuario_id = $1', [id]);
        
        if (result.rows.length === 0) {
            return null;
        }
        
        const disciplinaId = result.rows[0].disciplina_id;
        
        const disciplina = await db.query('SELECT nome FROM disciplinas WHERE id = $1', [disciplinaId]);
        
        return disciplina.rows[0]; 
    },

    turmasProfessor: async(id) => {
        const result = await db.query('SELECT turma_id FROM professores WHERE usuario_id = $1', [id]);

         if (result.rows.length === 0) {
            return null;
        }

        const turmaId = result.rows[0].turma_id;

        const turma = await db.query('SELECT nome FROM turmas WHERE id = $1', [turmaId]);

        return turma.rows[0];
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
