import asyncHandler from "express-async-handler";
import Categories from "../Models/CategoriesModels.js";

// ****************** PUBLIC CONTROLLERS ******************
// @desc    Get all categories
// @route   GET /api/categories
// @access  Public

const getAllCategories = asyncHandler(async (req, res) => {
    try {
        // find all categories in database
        const categories = await Categories.find({});
        // send all categories to client
        res.json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ****************** ADMIN CONTROLLERS ******************
// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin

const createCategory = asyncHandler(async (req, res) => {
    try {
        // get title from request body
        const { title } = req.body;
        
        // validate title
        if (!title) {
            res.status(400);
            throw new Error("Title is required");
        }

        // check if category already exists
        const categoryExists = await Categories.findOne({ title });
        if (categoryExists) {
            res.status(400);
            throw new Error("Category already exists");
        }

        // create new category
        const category = new Categories({ title });
        // save category to database
        const createdCategory = await category.save();
        // send new category to client
        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin

const updateCategory = asyncHandler(async (req, res) => {
    try {
        // validate id
        if (!req.params.id) {
            res.status(400);
            throw new Error("Category ID is required");
        }

        // get category id from request params
        const category = await Categories.findById(req.params.id);

        if (category) {
            // validate title
            if (!req.body.title) {
                res.status(400);
                throw new Error("Title is required");
            }

            // check if new title already exists
            const categoryExists = await Categories.findOne({ 
                title: req.body.title,
                _id: { $ne: req.params.id }
            });
            if (categoryExists) {
                res.status(400);
                throw new Error("Category with this title already exists");
            }

            // update category title
            category.title = req.body.title;
            // save category to database
            const updatedCategory = await category.save();
            // send updated category to client
            res.json(updatedCategory);
        } else {
            res.status(404);
            throw new Error("Category not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        // validate id
        if (!req.params.id) {
            res.status(400);
            throw new Error("Category ID is required");
        }

        // get category id from request params
        const category = await Categories.findById(req.params.id);

        if (category) {
            // delete category from database
            await category.deleteOne();
            // send deleted category to client
            res.json({ message: "Category deleted successfully" });
        } else {
            res.status(404);
            throw new Error("Category not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
});

export { getAllCategories, createCategory, updateCategory, deleteCategory };