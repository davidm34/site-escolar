const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Models = require('../models/models');

// LOGIN
router.post('/login', async (req, res) => {
    const { login, senha } = req.body;

    try {
        const usuario = await Models.getUsuarioByLogin(login);

        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            return res.status(401).json({ erro: "Login ou senha incorretos." });
        }

        // Gerar Token com ID e CARGO (cargo_usuario ENUM)
        const token = jwt.sign(
            { id: usuario.id, cargo: usuario.cargo },
            process.env.JWT,
            { expiresIn: '8h' }
        );

        res.json({
            usuario: { 
                id: usuario.id,
                nome: usuario.nome_completo, 
                cargo: usuario.cargo 
            },
            token
        });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor." });
    }
});

// REGISTRO (Exemplo para criar um aluno)
router.post('/registro/aluno', async (req, res) => {
    const { nome_completo, login, senha, turma_id } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const senhaHashed = await bcrypt.hash(senha, salt);
        
        const novoAluno = await Models.addUsuarioCompleto(
            nome_completo, 
            'aluno', 
            login, 
            senhaHashed, 
            { turma_id }
        );
        
        res.status(201).json(novoAluno);
    } catch (err) {
        res.status(400).json({ erro: "Erro ao cadastrar aluno. Verifique se o login já existe." });
    }
});

module.exports = router;