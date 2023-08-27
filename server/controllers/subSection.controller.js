const SubSection = require("../models/subSection.model");
const Section = require("../models/section.model");
const { AppError } = require("../utils/error.utils");
const { imageUploadToCloudinary } = require("../utils/imageUpload.util");

exports.createSubSection = async function (req, res, next) {
    try {
        const { sectionId, title, timeDuration, description } = req.body;
        const video = req.files.video;

        if (!sectionId || !title || !timeDuration || !description)
            return next(new AppError("All fields are mandatory", 500));

        const uploadDetails = await imageUploadToCloudinary(
            video,
            process.env.FOLDER_NAME
        );

        const subSection = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl: uploadDetails.secure_url,
        });

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSection: subSection._id,
                },
            },
            { new: true }
        );
        console.log(
            await Section.findById(sectionId).populate("subSection").exec()
        );
        res.status(200).json({
            success: true,
            message: "Sub section created successfully",
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

exports.updateSubSection = async function (req, res, next) {
    try {
        const { subSectionId, title, timeDuration, description } = req.body;
        const video = req.files.video;

        console.log("we are in update sub sectino");
        if (!subSectionId || !title || !timeDuration || !description)
            return next(new AppError("All fields are mandatory", 500));

        const uploadDetails = await imageUploadToCloudinary(
            video,
            process.env.FOLDER_NAME
        );
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                title,
                timeDuration,
                description,
                videoUrl: uploadDetails.secure_url,
            },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "SubSection is updated successfully",
            updatedSubSection,
        });
    } catch (error) {
        return next(new AppError("All fields are mandatory", 500));
    }
};

exports.deleteSubSection = async function (req, res, next) {
    try {
        const { subSectionId } = req.body;
        if (!subSectionId)
            return next(new AppError("All fields are mandatory", 500));

        await SubSection.findByIdAndDelete(subSectionId);
        res.status(200).json({
            success: true,
            message: "SubSection is deleted successfully",
        });
    } catch (error) {
        return next(new AppError("All fields are mandatory", 500));
    }
};
