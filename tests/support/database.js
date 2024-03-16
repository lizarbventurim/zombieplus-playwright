require('dotenv').config();
const { Pool } = require('pg');


const DbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
}

export async function executeSQL(sqlScript){

    try {
    const pool = new Pool(DbConfig);
    const client = await pool.connect();

    await client.query(sqlScript);
    const res = await client.query(sqlScript);
    console.log(res.rows);


    } catch (error) {
        console.log('Erro ao executar SQL ' + error);
    }
    
}