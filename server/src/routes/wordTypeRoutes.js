const express = require('express');

const {
    getWordTypes
} = require('../controllers/wordTypeController');

const router = express.Router();

router.get('/', getWordTypes);

module.exports = router;