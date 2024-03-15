const { Pool } = require('pg');

const DbConfig = {
    user: 'ibijwwzb',
    host: 'ziggy.db.elephantsql.com',
    password: 'z7u7iiLu3-oRhMV4C-0y-fH3wltGADim',
    database: 'ibijwwzb',
    port: 5432
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