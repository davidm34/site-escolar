require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Middlewares de Segurança
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json({ limit: '10kb' })); 

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // Janela de 15 minutos
    max: 100, // Limita cada IP a 100 requisições por janela
    message: "Muitas requisições vindas deste IP, tente novamente mais tarde."}
);

app.use('/api/', limiter); // Aplica o limite apenas nas rotas de API

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


app.listen(process.env.PORT);
