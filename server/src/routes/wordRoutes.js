const express = require('express');

const {
    getWords
} = require('../controllers/wordController');

const router = express.Router();

router.get('/', getWords);

module.exports = router;