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

module.exports = prisma;