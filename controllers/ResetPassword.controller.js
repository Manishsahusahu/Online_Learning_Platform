const User = require("../models/user.model.js");
const crypto = require("crypto");
const { default: AppError } = require("../utils/error.utils.js");
const mailSender = require("../utils/mailSender.utils.js");

exports.resetPasswordToken = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return next(new AppError("Email is required", 400));

        const user = await User.findOne({ email });
        if (!user) return next(new AppError("User does not exists", 400));

        const token = crypto.randomUUID();
        const newUser = await User.findOneAndUpdate(
            { email },
            {
                token: token,
                resetPasswordTokenExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );
        const url = `http://localhost:3000/${token}`;
        const mailResponse = await mailSender(
            email,
            "Reset password link",
            `Click on the link to reset your password ${url}`
        );
        res.status(200).json({
            success: true,
            message: "Reset password link sent successfully",
            mailResponse,
        });
    } catch (error) {
        return next(new AppError(error.message, 400));
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { password, confirmPassword, token } = req.body;
        if (!password || !confirmPassword || !token)
            return next(new AppError("All fields are mandatory", 400));

        if (password !== confirmPassword)
            return next(
                new AppError(
                    "Password is not matching with confirm password",
                    400
                )
            );

        const user = await User.findOne(token);
        if (!user) return next(new AppError("Token is invalid", 400));

        if (user.resetPasswordTokenExpires < Date.now())
            return next(
                new AppError("Reset password link has been expired", 400)
            );
        user.token = undefined;
        user.password = password;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password has been reset successfully",
            user,
        });
    } catch (error) {
        return next(new AppError(error.message, 400));
    }
};
