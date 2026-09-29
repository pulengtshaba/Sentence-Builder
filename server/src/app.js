require('dotenv').config();

const express = require('express');
const cors = require('cors');

const wordTypeRoutes =
    require('./routes/wordTypeRoutes');

const wordRoutes =
    require('./routes/wordRoutes');

const sentenceRoutes =
    require('./routes/sentenceRoutes');

const notFound =
    require('./middleware/notFound');

const errorHandler =
    require('./middleware/errorHandler');


const app = express();


app.use(
    cors({
        origin:
            process.env.CLIENT_URL ||
            'http://localhost:4200'
    })
);


app.use(express.json());


app.get('/api/health', (req, res) => {

    res.status(200).json({
        status: 'ok'
    });
});


app.use(
    '/api/word-types',
    wordTypeRoutes
);


app.use(
    '/api/words',
    wordRoutes
);


app.use(
    '/api/sentences',
    sentenceRoutes
);


app.use(notFound);

app.use(errorHandler);


module.exports = app;