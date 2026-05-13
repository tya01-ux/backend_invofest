import express from "express";
import { createCategory, getCategories,showCategory, updateCategory, deleteCategory  } from "../controllers/categoryController";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.get("/:id", showCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
