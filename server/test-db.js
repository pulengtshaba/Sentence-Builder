require('dotenv').config();
const sql = require('mssql');

const config = {
    server: 'localhost',
    database: 'SentenceBuilder',

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    options: {
        trustServerCertificate: true
    }
};

async function test() {
    try {
        const pool = await sql.connect(config);

        const result = await pool.request().query(`
            SELECT
                @@SERVERNAME AS ServerName,
                @@SERVICENAME AS ServiceName,
                DB_NAME() AS DatabaseName,
                SUSER_SNAME() AS LoginName
        `);

        console.table(result.recordset);

        await pool.close();

        console.log('SQL Server connection successful.');
    } catch (error) {
        console.error('SQL Server connection failed.');
        console.error(error);
    }
}

test();