const AppError =
    require('../errors/AppError');

const sentenceRepository =
    require('../repositories/sentenceRepository');

const wordRepository =
    require('../repositories/wordRepository');


function validateWordIds(wordIds) {

    if (!Array.isArray(wordIds)) {

        throw new AppError(
            'wordIds must be an array.',
            400
        );
    }

    if (wordIds.length === 0) {

        throw new AppError(
            'At least one word is required.',
            400
        );
    }

    const invalidId =
        wordIds.some(
            id =>
                !Number.isInteger(id) ||
                id <= 0
        );

    if (invalidId) {

        throw new AppError(
            'wordIds must contain positive integers.',
            400
        );
    }
}


async function validateWordsExist(wordIds) {

    const existingIds =
        await wordRepository.getExistingWordIds(
            wordIds
        );

    const existingSet =
        new Set(existingIds);

    const missingIds =
        wordIds.filter(
            id => !existingSet.has(id)
        );

    if (missingIds.length > 0) {

        throw new AppError(
            `The following word IDs do not exist: ${missingIds.join(', ')}`,
            400
        );
    }
}


function mapSentenceRows(rows) {

    if (!rows || rows.length === 0) {
        return null;
    }

    const firstRow = rows[0];

    return {
        id: firstRow.sentenceId,

        createdAt: firstRow.createdAt,

        text: rows
            .filter(row => row.wordId !== null)
            .sort(
                (a, b) => a.position - b.position
            )
            .map(row => row.wordText)
            .join(' '),

        words: rows
            .filter(row => row.wordId !== null)
            .sort(
                (a, b) => a.position - b.position
            )
            .map(row => ({
                id: row.wordId,
                text: row.wordText,
                position: row.position,
                wordTypeId: row.wordTypeId,
                wordTypeName: row.wordTypeName
            }))
    };
}


function mapSentences(rows) {

    const grouped =
        new Map();

    for (const row of rows) {

        if (!grouped.has(row.sentenceId)) {

            grouped.set(
                row.sentenceId,
                []
            );
        }

        grouped
            .get(row.sentenceId)
            .push(row);
    }

    return Array.from(
        grouped.values()
    )
        .map(mapSentenceRows)
        .filter(Boolean);
}


async function getAllSentences() {

    const rows =
        await sentenceRepository
            .getAllSentences();

    return mapSentences(rows);
}


async function getSentenceById(id) {

    if (
        !Number.isInteger(id) ||
        id <= 0
    ) {

        throw new AppError(
            'Sentence ID must be a positive integer.',
            400
        );
    }

    const rows =
        await sentenceRepository
            .getSentenceById(id);

    if (rows.length === 0) {

        throw new AppError(
            'Sentence not found.',
            404
        );
    }

    return mapSentenceRows(rows);
}


async function createSentence(wordIds) {

    validateWordIds(wordIds);

    await validateWordsExist(wordIds);

    const sentenceId =
        await sentenceRepository
            .createSentence(wordIds);

    const rows =
        await sentenceRepository
            .getSentenceById(sentenceId);

    return mapSentenceRows(rows);
}


async function updateSentence(
    id,
    wordIds
) {

    if (
        !Number.isInteger(id) ||
        id <= 0
    ) {

        throw new AppError(
            'Sentence ID must be a positive integer.',
            400
        );
    }

    validateWordIds(wordIds);

    const exists =
        await sentenceRepository
            .sentenceExists(id);

    if (!exists) {

        throw new AppError(
            'Sentence not found.',
            404
        );
    }

    await validateWordsExist(wordIds);

    await sentenceRepository
        .updateSentence(
            id,
            wordIds
        );

    const rows =
        await sentenceRepository
            .getSentenceById(id);

    return mapSentenceRows(rows);
}


module.exports = {
    getAllSentences,
    getSentenceById,
    createSentence,
    updateSentence
};