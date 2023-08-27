const User = require("../models/user.model.js");
const OTP = require("../models/otp.model.js");
const { AppError } = require("../utils/error.utils.js");
const otpGenerator = require("otp-generator");
const Profile = require("../models/profile.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender.utils.js");

const otpCreator = () => {
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
    return otp;
};

exports.sendOTP = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (user) return next(new AppError("User already exists!", 401));

        let otp = otpCreator();
        let result = await OTP.findOne({ otp });
        while (result) {
            otp = otpCreator();
            result = await OTP.findOne({ otp });
        }
        console.log(otp);

        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);

        res.status(200).json({
            success: true,
            message: "OTP generated successfully",
            otpBody,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

exports.signup = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            contactNumber,
            accountType,
        } = req.body;

        if (
            !email ||
            !firstName ||
            !lastName ||
            !password ||
            !confirmPassword ||
            !otp
        )
            return next(new AppError("These fields are necessary", 403));

        if (password !== confirmPassword)
            return next(
                new AppError("Password and Confirm password should match", 400)
            );

        const user = await User.findOne({ email });
        if (user) return next(new AppError("User already exists", 400));

        const recentOtp = await OTP.find({ email })
            .sort({ createdAt: -1 })
            .limit(1);
        if (!recentOtp) return next(new AppError("OTP not found", 400));
        if (recentOtp[0].otp !== otp)
            return next(new AppError("OTP does not match", 400));

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: contactNumber,
        });

        await profileDetails.save();

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            otp,
            contactNumber,
            accountType,
            additionalInformation: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });
        await newUser.save();

        res.status(200).json({
            success: true,
            message: "User created successfully",
            newUser,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return next(new AppError("All fields are mandatory", 403));

        const user = await User.findOne({ email });
        if (!user)
            return next(
                new AppError("User does not exists, please sign up", 400)
            );

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return next(new AppError("User or password is invalid", 400));

        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        // user.token = token;
        await user.save();

        user.password = undefined;

        const options = {
            httpOnly: true,
            expires: new Date(Date.now() + 3 * 24 * 3600 * 1000),
        };

        res.cookie("token", token, options).status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            token,
        });
    } catch (error) {
        return next(new AppError(error.message, 400));
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = req.body;
        if (!email || !oldPassword || !newPassword || !confirmPassword)
            return next(new AppError("All fields are mandatory", 400));

        if (newPassword !== confirmPassword)
            return next(
                new AppError(
                    "New password and confirm password are not matching",
                    400
                )
            );

        const user = await User.findOne({ email });
        if (!user) return next(new AppError("User does not exits", 400));

        if (!(await bcrypt.compare(oldPassword, user.password)))
            return next(new AppError("Old password is invalid", 400));

        user.password = newPassword;
        await user.save();
        user.password = undefined;

        const sendMailResponse = await mailSender(
            email,
            "Change password",
            "Password has been changed successfully!"
        );

        res.status(200).json({
            success: true,
            message: "Password has changed successfully",
            sendMailResponse,
        });
    } catch (error) {
        return next(
            new AppError(
                `Error while changing the password ${error.message}`,
                400
            )
        );
    }
};
