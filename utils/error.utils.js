class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

// console.log(new AppError("checking error", 400))

module.exports = {AppError};
