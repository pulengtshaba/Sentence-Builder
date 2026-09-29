require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const { PrismaMssql } = require('@prisma/adapter-mssql');

const adapter = new PrismaMssql({
    server: 'localhost',
    port: 1433,
    database: 'SentenceBuilder',

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    options: {
        trustServerCertificate: true
    }
});

const prisma = new PrismaClient({
    adapter
});

async function test() {
    try {
        const result = await prisma.$queryRaw`
            SELECT
                @@SERVERNAME AS ServerName,
                @@SERVICENAME AS ServiceName,
                DB_NAME() AS DatabaseName,
                SUSER_SNAME() AS LoginName
        `;

        console.table(result);

        console.log('Prisma SQL Server connection successful.');
    } catch (error) {
        console.error('Prisma connection failed.');
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

test();