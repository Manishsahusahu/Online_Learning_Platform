const Profile = require("../models/profile.model");
const User = require("../models/user.model");
const { AppError } = require("../utils/error.utils");
const { imageUploadToCloudinary } = require("../utils/imageUpload.util");

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
            message: "User details are fetched successfully",
            user,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

exports.getEnrolledCourses = async function (req, res, next) {
    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId).populate("courses");
        if (!userDetails)
            return next(new AppError("user details not found", 500));

        const enrolledCourses = userDetails.courses;
        console.log(enrolledCourses);

        res.status(200).json({
            success: true,
            message: "Courses for user are fetched successfully",
            enrolledCourses,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

exports.updateDisplayPicture = async function (req, res, next) {
    try {
        const userId = req.user.id;
        const image = req.files.displayPicture;
        if (!image) return next(new AppError("Image not found", 500));

        const imageResponse = await imageUploadToCloudinary(
            image,
            process.env.FOLDER_NAME
        );
        const userDetails = await User.findById(userId);

        if (!userDetails)
            return next(new AppError("user details not found", 500));

        const newUser = await User.findByIdAndUpdate(
            userId,
            {
                image: imageResponse.secure_url,
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Display picture is updated successfully",
            newUser,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
