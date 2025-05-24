import express from "express";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../Controllers/CategoriesController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

//********* PUBLIC ROUTES **********
router.get("/", getAllCategories);

//********* PRIVATE ROUTES *********
router.post("/", protect, admin, createCategory);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

export default router;