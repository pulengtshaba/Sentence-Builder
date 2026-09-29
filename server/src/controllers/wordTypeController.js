const wordTypeService =
    require('../services/wordTypeService');

async function getWordTypes(req, res, next) {

    try {

        const wordTypes =
            await wordTypeService.getAllWordTypes();

        res.status(200).json(wordTypes);

    } catch (error) {

        next(error);
    }
}

module.exports = {
    getWordTypes
};