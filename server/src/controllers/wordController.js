const wordService =
    require('../services/wordService');


async function getWords(req, res, next) {

    try {

        const rawTypeId =
            req.query.typeId;

        const typeId =
            Number(rawTypeId);

        if (
            rawTypeId === undefined
            ||
            !Number.isInteger(typeId)
            ||
            typeId <= 0
        ) {

            const error =
                new Error(
                    'typeId must be a positive integer.'
                );

            error.statusCode = 400;
            error.isOperational = true;

            throw error;
        }


        const words =
            await wordService.getWordsByTypeId(
                typeId
            );


        res
            .status(200)
            .json(words);

    } catch (error) {

        next(error);
    }
}


module.exports = {
    getWords
};