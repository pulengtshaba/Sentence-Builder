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
            process.env.CLIENT_URL
    })
);


app.use(express.json());


/*
 * Liveness health check.
 *
 * Confirms that the API process is running.
 */
app.get('/api/health/live', (req, res) => {

    res
        .status(200)
        .json({
            status: 'healthy'
        });
});


/*
 * Existing API health endpoint.
 */
app.get('/api/health', (req, res) => {

    res
        .status(200)
        .json({
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