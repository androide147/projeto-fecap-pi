// backend/database/db.js
const mysql = require('mysql2/promise');

// O seu código já estava a ler a variável de ambiente, o que está perfeito.
const connectionString = process.env.DATABASE_URL;

// Criamos o pool de conexões
const pool = mysql.createPool(connectionString);

// --- FUNÇÃO DE INICIALIZAÇÃO (A SOLUÇÃO) ---
// Esta função vai rodar automaticamente e criar as tabelas
async function initDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log('[Database] Conexão com MySQL (Railway) estabelecida.');

        // Script para criar a tabela 'users' (só se ela não existir)
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                senha_hash VARCHAR(255) NOT NULL,
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('[Database] Tabela "users" verificada/criada com sucesso.');

        // Script para criar a tabela 'noticias' (só se ela não existir)
        await connection.query(`
            CREATE TABLE IF NOT EXISTS noticias (
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(255) NOT NULL,
                descricao TEXT NOT NULL,
                imagem_url VARCHAR(255) NOT NULL,
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('[Database] Tabela "noticias" verificada/criada com sucesso.');

        // Liberta a conexão
        connection.release();

    } catch (err) {
        console.error('[Database] ERRO AO INICIALIZAR O BANCO DE DADOS:');
        console.error(err.message);
        // Se falhar aqui, o servidor vai "crashar", o que é bom para vermos o log.
        // O erro 'Cannot read properties of undefined (reading 'isServer')' 
        // que vimos antes, era porque o 'connectionString' estava vazio.
        // Ao corrigirmos a variável DATABASE_URL (que fizemos antes), este erro deve desaparecer.
    }
}

// --- EXECUTAMOS A FUNÇÃO DE INICIALIZAÇÃO ---
initDatabase();

// Exporta o pool para o resto da aplicação
module.exports = pool;
