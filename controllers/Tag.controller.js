const Tag = require("../models/tag.model.js");
const { default: AppError } = require("../utils/error.utils.js");

exports.createTag = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        if (!name || !description)
            return next(new AppError("All fields are mandatory", 500));

        const tag = await Tag.create({
            name,
            description,
        });
        await tag.save();

        res.status(200).json({
            success: true,
            message: "Tag created successfully",
            tag,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
exports.allTags = async (req, res, next) => {
    try {
        const tags = await Tag.find({}, { name: true, description: true });

        res.status(200).json({
            success: true,
            message: "Tags returned successfully",
            tags,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
