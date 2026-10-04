const express = require('express');

const {
    getSentences,
    getSentence,
    createSentence,
    updateSentence
} = require('../controllers/sentenceController');

const router = express.Router();

router.get('/', getSentences);

router.get('/:id', getSentence);

router.post('/', createSentence);

router.put('/:id', updateSentence);

module.exports = router;