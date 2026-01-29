const express = require('express');
const app = express();
const PORT = 3001;

// Middleware para permitir que o Express entenda JSON no corpo das requisições
app.use(express.json());

// Rota de exemplo (GET) - O famoso "Hello World"
app.get('/', (req, res) => {
    res.send('Bem-vindo à minha API Node.js!');
});

// Rota de exemplo (POST) - Recebendo dados
app.post('/usuario', (req, res) => {
    const { nome } = req.body;
    res.status(201).json({
        mensagem: `Usuário ${nome} criado com sucesso!`,
        status: "sucesso"
    });
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});