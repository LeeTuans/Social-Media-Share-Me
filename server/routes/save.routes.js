import express from "express";

import {
  getSavedByUser,
  createSave,
  updateSaved,
  deleteSaved,
} from "../controllers/save.controller.js";

const router = express.Router();

router.route("/:id").get(getSavedByUser);
router.route("/").post(createSave);
router.route("/").put(updateSaved);
router.route("/:id").delete(deleteSaved);

export default router;
