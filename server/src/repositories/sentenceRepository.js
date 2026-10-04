const prisma = require('../config/database');

async function getAllSentences() {

    const sentences = await prisma.sentence.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            createdAt: true,
            sentenceWords: {
                orderBy: {
                    position: 'asc'
                },
                select: {
                    position: true,
                    word: {
                        select: {
                            id: true,
                            text: true,
                            wordTypeId: true,
                            wordType: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return sentences.flatMap(sentence =>
        sentence.sentenceWords.map(sentenceWord => ({
            sentenceId: sentence.id,
            createdAt: sentence.createdAt,
            position: sentenceWord.position,
            wordId: sentenceWord.word.id,
            wordText: sentenceWord.word.text,
            wordTypeId: sentenceWord.word.wordTypeId,
            wordTypeName: sentenceWord.word.wordType.name
        }))
    );
}

async function getSentenceById(id) {

    const sentence = await prisma.sentence.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            createdAt: true,
            sentenceWords: {
                orderBy: {
                    position: 'asc'
                },
                select: {
                    position: true,
                    word: {
                        select: {
                            id: true,
                            text: true,
                            wordTypeId: true,
                            wordType: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    if (!sentence) {
        return [];
    }

    return sentence.sentenceWords.map(sentenceWord => ({
        sentenceId: sentence.id,
        createdAt: sentence.createdAt,
        position: sentenceWord.position,
        wordId: sentenceWord.word.id,
        wordText: sentenceWord.word.text,
        wordTypeId: sentenceWord.word.wordTypeId,
        wordTypeName: sentenceWord.word.wordType.name
    }));
}

async function createSentence(wordIds) {

    const sentence = await prisma.sentence.create({
        data: {
            sentenceWords: {
                create: wordIds.map((wordId, index) => ({
                    wordId,
                    position: index + 1
                }))
            }
        },
        select: {
            id: true
        }
    });

    return sentence.id;
}

async function updateSentence(sentenceId, wordIds) {

    await prisma.$transaction(async (tx) => {

        await tx.sentenceWord.deleteMany({
            where: {
                sentenceId
            }
        });

        if (wordIds.length > 0) {

            await tx.sentenceWord.createMany({
                data: wordIds.map((wordId, index) => ({
                    sentenceId,
                    wordId,
                    position: index + 1
                }))
            });
        }
    });
}

async function sentenceExists(id) {

    const sentence = await prisma.sentence.findUnique({
        where: {
            id
        },
        select: {
            id: true
        }
    });

    return sentence !== null;
}


module.exports = {
    getAllSentences,
    getSentenceById,
    createSentence,
    updateSentence,
    sentenceExists
};