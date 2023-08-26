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

exports.categoryPageDetails = async function (req, res, next) {
    try {
        const { categoryId } = req.body;
        if (!categoryId)
            return next(new AppError("all fields are mandatory", 500));

        const selectedCategory = await Category.findById(categoryId)
            .populate("courses")
            .exec();

        if (!selectedCategory)
            return next(new AppError("Category not found", 500));

        const differentCategories = await Category.find({
            _id: { $ne: categoryId },
        })
            .populate("courses")
            .exec();

        // home work for top selling courses findings

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
            },
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
