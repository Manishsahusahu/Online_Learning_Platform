const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const { AppError } = require("../utils/error.utils.js");

exports.auth = async (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer", "");

        if (!token) return next(new AppError("Token is missing", 400));

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;
        next();
    } catch (error) {
        return next(
            new AppError(
                `Error while validating login status ${error.message}`,
                400
            )
        );
    }
};

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student")
            return next(new AppError("Protected route only for students", 401));

        next();
    } catch (error) {
        return next(new AppError(error.message, 401));
    }
};
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor")
            return next(
                new AppError("Protected route only for Instructor", 401)
            );

        next();
    } catch (error) {
        return next(new AppError(error.message, 401));
    }
};
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin")
            return next(new AppError("Protected route only for Admin", 401));

        next();
    } catch (error) {
        return next(new AppError(error.message, 401));
    }
};
