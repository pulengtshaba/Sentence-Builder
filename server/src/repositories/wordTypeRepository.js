const prisma = require('../config/database');

async function getAllWordTypes() {
    return prisma.wordType.findMany({
        orderBy: {
            id: 'asc'
        }
    });
}

module.exports = {
    getAllWordTypes
};