const Course = require("../models/course.model");
const Tag = require("../models/tag.model");
const User = require("../models/user.model");
const { default: AppError } = require("../utils/error.utils");
const { imageUploadToCloudinary } = require("../utils/imageUpload.util");

exports.createCourse = async (req, res, next) => {
    try {
        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tagId,
        } = req.body;
        const thumbnail = req.files.thumbnailImage;

        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag ||
            !thumbnail
        )
            return next(new AppError("All fields are mandatory", 500));

        const userId = req.user.id;
        const instructor = await User.findById(userId);
        if (!instructor) return next(new AppError("Instructor not found", 500));

        const tag = await Tag.findById(tagId);
        if (!tag) return next(new AppError("Tag not found", 500));

        const thumbnailImage = await imageUploadToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );

        const course = await Course.create({
            courseName,
            courseDescription,
            instructor: userId,
            whatYouWillLearn,
            price,
            tag: tagId,
            thumbnail: thumbnailImage.secure_url,
        });
        await course.save();

        await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    courses: course._id,
                },
            },
            { new: true }
        );

        await Tag.findByIdAndUpdate(
            tagId,
            {
                $push: {
                    courses: course._id,
                },
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Course creation successfull",
            course,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

exports.getAllCourses = async function (req, res, next) {
    try {
        const courses = await Course.find(
            {},
            {
                courseName: true,
                courseDescription: true,
                thumbnail: true,
                instructor: true,
                price: true,
                ratingAndReviews: true,
                students: true,
            }
        )
            .populate("instructor")
            .exec();

        res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            courses,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
