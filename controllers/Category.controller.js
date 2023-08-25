const Category = require("../models/category.model.js");
const { default: AppError } = require("../utils/error.utils.js");

exports.createCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        if (!name || !description)
            return next(new AppError("All fields are mandatory", 500));

        const category = await Category.create({
            name,
            description,
        });
        await category.save();

        res.status(200).json({
            success: true,
            message: "Category created successfully",
            category,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
exports.allCategories = async (req, res, next) => {
    try {
        const categories = await Category.find(
            {},
            { name: true, description: true }
        );

        res.status(200).json({
            success: true,
            message: "categories returned successfully",
            categories,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
