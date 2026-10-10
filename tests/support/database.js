require('dotenv').config({ quiet: true });
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

/**
 * Executa um script SQL (uma única vez) e devolve as linhas retornadas.
 * Lança o erro para o teste falhar quando o banco não estiver acessível.
 */
export async function executeSQL(sqlScript) {
    const client = await pool.connect();
    try {
        const res = await client.query(sqlScript);
        return res.rows;
    } finally {
        client.release();
    }
}
