const Profile = require("../models/profile.model");
const User = require("../models/user.model");
const { default: AppError } = require("../utils/error.utils");

exports.updateProfile = async function (req, res, next) {
    try {
        const {
            dateOfBirth = "",
            about = "",
            contactNumber,
            gender,
        } = req.body;
        const { id } = req.user;
        if (!contactNumber || !gender)
            return next(new AppError("Marked fields are mandatory", 500));

        const user = await User.findById(id);
        if (!user)
            return next(new AppError("User not found, Kindly login", 500));

        const profile = await Profile.findById(user.additionalInformation);

        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;
        profile.gender = gender;

        await profile.save();

        profile.contactNumber = undefined;

        res.status(200).json({
            success: true,
            message: "Profile has been updated successfully",
            profile,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

exports.deleteAccount = async function (req, res, next) {
    try {
        const { id } = req.user;

        const user = await User.findById(id);
        if (!user) return next(new AppError("User not found", 404));

        await Profile.findByIdAndDelete(user.additionalInformation);
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "User account has been deleted successfully",
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

exports.getAllUserDetails = async function (req, res, next) {
    try {
        const { id } = req.user;

        const user = await User.findById(id)
            .populate("additionalInformation")
            .exec();
        if (!user) return next(new AppError("User not found", 404));

        res.status(200).json({
            success: true,
            message: "User account has been deleted successfully",
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
