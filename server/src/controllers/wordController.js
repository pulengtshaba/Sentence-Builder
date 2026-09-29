const wordService =
    require('../services/wordService');

async function getWords(req, res, next) {

    try {

        const typeId =
            Number(req.query.typeId);

        const words =
            await wordService.getWordsByTypeId(
                typeId
            );

        res.status(200).json(words);

    } catch (error) {

        next(error);
    }
}

module.exports = {
    getWords
};