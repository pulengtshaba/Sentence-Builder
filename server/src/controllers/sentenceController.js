const sentenceService =
    require('../services/sentenceService');


function validateSentenceId(rawId) {

    const id =
        Number(rawId);

    if (
        rawId === undefined
        ||
        !Number.isInteger(id)
        ||
        id <= 0
    ) {

        const error =
            new Error(
                'Sentence ID must be a positive integer.'
            );

        error.statusCode = 400;
        error.isOperational = true;

        throw error;
    }

    return id;
}


async function getSentences(req, res, next) {

    try {

        const sentences =
            await sentenceService
                .getAllSentences();

        res
            .status(200)
            .json(sentences);

    } catch (error) {

        next(error);
    }
}


async function getSentence(req, res, next) {

    try {

        const id =
            validateSentenceId(
                req.params.id
            );

        const sentence =
            await sentenceService
                .getSentenceById(id);

        res
            .status(200)
            .json(sentence);

    } catch (error) {

        next(error);
    }
}


async function createSentence(req, res, next) {

    try {

        const {
            wordIds
        } = req.body;

        const sentence =
            await sentenceService
                .createSentence(wordIds);

        res
            .status(201)
            .json(sentence);

    } catch (error) {

        next(error);
    }
}


async function updateSentence(req, res, next) {

    try {

        const id =
            validateSentenceId(
                req.params.id
            );

        const {
            wordIds
        } = req.body;

        const sentence =
            await sentenceService
                .updateSentence(
                    id,
                    wordIds
                );

        res
            .status(200)
            .json(sentence);

    } catch (error) {

        next(error);
    }
}


module.exports = {
    getSentences,
    getSentence,
    createSentence,
    updateSentence
};
