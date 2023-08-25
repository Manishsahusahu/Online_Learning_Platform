const Section = require("../models/section.model");
const Course = require("../models/course.model.js");
const { default: AppError } = require("../utils/error.utils");

exports.createSection = async function (req, res, next) {
    try {
        const { sectionName, courseId } = req.body;

        if (!sectionName || !courseId)
            return next(new AppError("All fields are mandatory", 400));

        const section = await Section.create({ sectionName });

        const updatedCourse = await Section.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: section._id,
                },
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Section is created successfully",
            updatedCourse,
        });
    } catch (error) {
        return next(new AppError(error.message, 400));
    }
};

exports.updateSection = async function (req, res, next) {
    try {
        const { sectionName, sectionId } = req.body;

        if (!sectionName || !sectionId)
            return next(new AppError("All fields are mandatory", 400));

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                sectionName,
            },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Section updated successfully",
        });
    } catch (error) {
        return next(new AppError(error.message, 400));
    }
};

exports.deleteSection = async function (req, res, next) {
    try {
        const { sectionId } = req.params;
        if (!sectionId) return next(new AppError("Id not found", 400));

        await Section.findByIdAndDelete(sectionId);

        res.status(200).json({
            success: true,
            message: "Section deleted successfully",
        });
    } catch (error) {
        return next(new AppError(error.message, 400));
    }
};
