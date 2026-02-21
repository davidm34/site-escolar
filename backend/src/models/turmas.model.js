const db = require('../config/database');

const TurmasModel = {

    // Criar turma
    criarTurma: async (nome) => {
        try {
            const existe = await db.query(
                'SELECT id FROM turmas WHERE nome = $1',
                [nome]
            );

            if (existe.rows.length > 0) {
                // Lança um erro customizado que será capturado pelo catch
                const erroCustomizado = new Error('Já existe uma turma cadastrada com este nome.');
                erroCustomizado.code = 'VALOR_DUPLICADO'; 
                throw erroCustomizado;
            }

            const res = await db.query(
                'INSERT INTO turmas (nome) VALUES ($1) RETURNING *',
                [nome]
            );
            
            return res.rows[0];
        } catch (error) {
            console.log("ERRO DENTRO DO MODEL:", error.message);
            throw error;
        }
    },

    // Listar todas as turmas
    listarTurmas: async () => {
        const res = await db.query('SELECT * FROM turmas ORDER BY id');
        return res.rows;
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
    },

    listarTurmasProfessores: async (id) => {
        const result = await db.query(`
            SELECT t.id as turma_id, t.nome
            FROM professores p
            JOIN turmas t ON t.id = p.turma_id
            WHERE p.usuario_id = $1
        `, [id]);

       return result.rows; 
    },

    // Buscar turma por ID
    buscarTurmaPorId: async (id) => {
        const res = await db.query(
            'SELECT * FROM turmas WHERE id = $1',
            [id]
        );
        return res.rows[0];
    },

    buscarPorNome: async (nome) => {
        const res = await db.query('SELECT * FROM turmas WHERE nome = $1', [nome]);
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

    // Listar disciplinas de um professor
    listarDisciplinasDoProfessor: async (id, turma_id) => {
        const id_disciplinas = await db.query(
            `SELECT disciplina_id
            FROM professores p
            WHERE p.usuario_id = $1 AND p.turma_id = $2`,
            [id, turma_id]
        );
        
        if (id_disciplinas.rows.length === 0) {
            return [];
        }
        
        const disciplinasIds = id_disciplinas.rows.map(k => k.disciplina_id);
        
        // Usa ANY($1) para comparar com múltiplos valores
        const nome_disciplinas = await db.query(
            `SELECT id, nome
            FROM disciplinas
            WHERE id = ANY($1::int[])`,
            [disciplinasIds]
        );
        
        const res = nome_disciplinas.rows.map(disciplina => ({
            id: disciplina.id,
            nome: disciplina.nome
        }));
        
        return res;
    },

    listarTurmaAlunos: async (turma_id) => {
        const res = await db.query(
            `SELECT usuario_id
            FROM alunos
            WHERE turma_id = $1`,
            [turma_id]
        );
        return res.rows;
    },

    listarNotasAlunos: async(id_alunos, id_disciplina) => {

        const ids = id_alunos.map(k => k.usuario_id);

        const resultado = []

        for(let i = 0; i < ids.length; i++){
            const res = await db.query(
                `SELECT unidade_id, valor
                FROM notas
                WHERE aluno_id = $1 AND disciplina_id = $2`,
                [ids[i], id_disciplina]
            )

            resultado.push(res.rows)
            
        }
        
        return resultado;
    }

};

module.exports = TurmasModel;
