const Course = require("../models/course.model");
const Category = require("../models/category.model");
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
            categoryId,
        } = req.body;
        const thumbnail = req.files.thumbnailImage;

        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !category ||
            !thumbnail
        )
            return next(new AppError("All fields are mandatory", 500));

        const userId = req.user.id;
        const instructor = await User.findById(userId);
        if (!instructor) return next(new AppError("Instructor not found", 500));

        const category = await Category.findById(categoryId);
        if (!category) return next(new AppError("category not found", 500));

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
            category: categoryId,
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

        await Category.findByIdAndUpdate(
            categoryId,
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
