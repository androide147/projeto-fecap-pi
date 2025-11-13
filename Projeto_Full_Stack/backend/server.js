// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
// A variável PORT é injetada automaticamente pelo Railway
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Conexão com o Banco de Dados (com o script de criação automática)
require('./database/db.js'); 

// Rota de Teste da API
app.get('/api/status', (req, res) => {
    res.json({ status: 'API está online e funcionando!' });
});

// Rotas de Autenticação
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Rotas Protegidas
const protectedRoutes = require('./routes/protectedRoutes');
app.use('/api/protegido', protectedRoutes);

// Rotas de Notícias (CRUD)
const noticiaRoutes = require('./routes/noticiaRoutes');
app.use('/api/noticias', noticiaRoutes);


// --- A CORREÇÃO ESTÁ AQUI ---
// Adicionamos '0.0.0.0' para "ouvir" a rede pública do Railway
app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Servidor] Backend rodando na porta ${PORT}`);
});
