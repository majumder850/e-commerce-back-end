const Category = require('../models/Category');

// 1. Fetching all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({ data: { categories } });
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};

// 2. Fetching a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ data: { category } });
    } catch (error) {
        res.status(500).json({ message: "Error fetching category", error: error.message });
    }
};

// 3. Adding a new category
const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({ data: { category } });
    } catch (error) {
        res.status(400).json({ message: "Error creating category", error: error.message });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory
};