const RatingAndReviews = require("../models/ratingAndReview.model");
const Course = require("../models/course.model");
const { AppError } = require("../utils/error.utils");
const { default: mongoose, mongo } = require("mongoose");

exports.createRating = async function (req, res, next) {
    try {
        const { rating, review, courseId } = req.body;
        const userId = req.user.id;
        const courseDetails = await Course.findOne({
            _id: courseId,
            students: {
                $elemMatch: {
                    $eq: userId,
                },
            },
        });
        if (!courseDetails)
            return next(new AppError("User is not enrolled in course", 404));

        const alreadyReviewed = await RatingAndReviews.findOne({
            user: mongoose.Types.ObjectId(userId),
            course: mongoose.Types.ObjectId(courseId),
        });
        if (alreadyReviewed)
            return next(
                new AppError("Rating is already given by the student", 404)
            );

        const ratingReview = await RatingAndReviews.create({
            rating,
            review,
            user: mongoose.Types.ObjectId(userId),
            course: mongoose.Types.ObjectId(courseId),
        });

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    ratingAndReviews: mongoose.Types.ObjectId(ratingReview._id),
                },
            },
            { new: true }
        );
        console.log(updatedCourseDetails);

        res.status(200).json({
            success: true,
            message: "Rating is updated in course successfully",
            ratingReview,
        });
    } catch (error) {
        return next(new AppError(error.message, 404));
    }
};

exports.getAverageRating = async function (req, res, next) {
    try {
        const { courseId } = req.body;
        const result = await RatingAndReviews.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null, //since we want all entries
                    averageRating: {
                        $avg: "$rating",
                    },
                },
            },
        ]);

        if (result.length) {
            res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }
        return res.status(200).json({
            success: true,
            averageRating: 0,
        });
    } catch (error) {
        return next(new AppError(error.message, 404));
    }
};

exports.getAllRatings = async function (req, res, next) {
    try {
        const allReviews = await RatingAndReviews.find({})
            .sort({ rating: "desc" })
            .populate({
                path: user,
                select: "firstName, lastName, image, email",
            });
        return res.status(200).json({
            success: true,
            message: "all reviews fetched successfully",
            allReviews,
        });
    } catch (error) {
        return next(new AppError(error.message, 404));
    }
};
