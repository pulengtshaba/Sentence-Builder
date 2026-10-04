const prisma = require('../config/database');

async function getWordsByTypeId(wordTypeId) {
    return prisma.word.findMany({
        where: {
            wordTypeId
        },
        orderBy: {
            text: 'asc'
        }
    });
}

async function getExistingWordIds(wordIds) {

    if (wordIds.length === 0) {
        return [];
    }

    const words = await prisma.word.findMany({
        where: {
            id: {
                in: wordIds
            }
        },
        select: {
            id: true
        }
    });

    return words.map(word => word.id);
}

module.exports = {
    getWordsByTypeId,
    getExistingWordIds
};