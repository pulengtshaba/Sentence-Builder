require('dotenv').config();

const app = require('./app');

const PORT =
    process.env.PORT || 3000;


const server =
    app.listen(
        PORT,
        () => {

            console.log(
                `Server running on port ${PORT}`
            );

        }
    );


process.on(
    'SIGINT',
    () => {

        console.log(
            'Shutting down server...'
        );

        server.close(
            () => {

                process.exit(0);

            }
        );
    }
);