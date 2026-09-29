const sentenceService =
    require('../services/sentenceService');


async function getSentences(req, res, next) {

    try {

        const sentences =
            await sentenceService
                .getAllSentences();

        res.status(200).json(sentences);

    } catch (error) {

        next(error);
    }
}


async function getSentence(req, res, next) {

    try {

        const id =
            Number(req.params.id);

        const sentence =
            await sentenceService
                .getSentenceById(id);

        res.status(200).json(sentence);

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
            Number(req.params.id);

        const {
            wordIds
        } = req.body;

        const sentence =
            await sentenceService
                .updateSentence(
                    id,
                    wordIds
                );

        res.status(200).json(sentence);

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