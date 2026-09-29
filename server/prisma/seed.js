require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const { PrismaMssql } = require('@prisma/adapter-mssql');

const adapter = new PrismaMssql({
    server: 'localhost',
    port: 1433,
    database: 'SentenceBuilder',

    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }
    },

    options: {
        trustServerCertificate: true
    }
});

const prisma = new PrismaClient({
    adapter
});

const wordData = {
    Noun: [
        'dog',
        'cat',
        'car',
        'developer',
        'house',
        'computer',
        'school',
        'teacher',
        'garden',
        'book'
    ],

    Verb: [
        'runs',
        'writes',
        'drives',
        'builds',
        'reads',
        'plays',
        'walks',
        'eats',
        'learns',
        'works'
    ],

    Adjective: [
        'fast',
        'clever',
        'happy',
        'large',
        'small',
        'bright',
        'beautiful',
        'quiet',
        'strong',
        'young'
    ],

    Adverb: [
        'quickly',
        'slowly',
        'carefully',
        'quietly',
        'happily',
        'loudly',
        'easily',
        'bravely',
        'politely',
        'badly'
    ],

    Pronoun: [
        'he',
        'she',
        'they',
        'we',
        'I',
        'you',
        'it',
        'me',
        'us',
        'them'
    ],

    Preposition: [
        'in',
        'on',
        'under',
        'with',
        'over',
        'behind',
        'beside',
        'between',
        'near',
        'from'
    ],

    Conjunction: [
        'and',
        'but',
        'or',
        'because',
        'although',
        'while',
        'if',
        'so',
        'yet',
        'unless'
    ],

    Determiner: [
        'the',
        'a',
        'an',
        'this',
        'that',
        'these',
        'those',
        'my',
        'your',
        'some'
    ],

    Exclamation: [
        'wow',
        'hey',
        'ouch',
        'hooray',
        'oops',
        'bravo',
        'yay',
        'oh',
        'ah',
        'hello'
    ]
};

async function main() {

    await prisma.$transaction(async (tx) => {
        for (const [typeName, words] of Object.entries(wordData)) {
            const wordType = await tx.wordType.upsert({
                where: {
                    name: typeName
                },
                update: {},
                create: {
                    name: typeName
                }
            });


            for (const text of words) {
                await tx.word.upsert({
                    where: {
                        text_wordTypeId: {
                            text,
                            wordTypeId: wordType.id
                        }
                    },
                    update: {},
                    create: {
                        text,
                        wordTypeId: wordType.id
                    }
                });
            }

        }
    });


    const summary = await prisma.wordType.findMany({
        orderBy: {
            name: 'asc'
        },
        select: {
            name: true,
            _count: {
                select: {
                    words: true
                }
            }
        }
    });

    console.log('\nSentenceBuilder seed completed successfully.\n');

    console.table(
        summary.map((type) => ({
            WordType: type.name,
            WordCount: type._count.words
        }))
    );

}

main()
    .catch((error) => {
        console.error('Database seed failed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });