import express from "express";

import {
  getAllCategories,
  createCategory,
  getCategoryInfoById,
} from "../controllers/category.controller.js";

const router = express.Router();

router.route("/").get(getAllCategories);
router.route("/").get(getCategoryInfoById);
router.route("/").post(createCategory);

export default router;
