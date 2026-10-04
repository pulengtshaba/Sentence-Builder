const AppError =
    require('../errors/AppError');

const wordRepository =
    require('../repositories/wordRepository');

async function getWordsByTypeId(typeId) {

    if (
        !Number.isInteger(typeId) ||
        typeId <= 0
    ) {
        throw new AppError(
            'typeId must be a positive integer.',
            400
        );
    }

    return wordRepository.getWordsByTypeId(typeId);
}

module.exports = {
    getWordsByTypeId
};