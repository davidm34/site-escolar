require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Importação das Rotas
const authRoutes = require('./src/controllers/auth.controller');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Uso das Rotas
app.use('/auth', authRoutes);
app.use('/aluno', require('./src/routes/aluno'));
app.use('/professores', require('./src/routes/professores'));
app.use('/administradores', require('./src/routes/administradores'));


// Rota padrão para teste
app.get('/', (req, res) => res.send('API Escola Sonho Feliz Online'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost: {PORT}`);
});