function errorHandler(
    error,
    req,
    res,
    next
) {

    console.error(error);

    const statusCode =
        error.statusCode || 500;

    const message =
        error.isOperational
            ? error.message
            : 'An unexpected server error occurred.';

    res.status(statusCode).json({
        message
    });
}

module.exports = errorHandler;