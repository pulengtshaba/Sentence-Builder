const wordTypeRepository =
    require('../repositories/wordTypeRepository');

async function getAllWordTypes() {

    return wordTypeRepository.getAllWordTypes();
}

module.exports = {
    getAllWordTypes
};