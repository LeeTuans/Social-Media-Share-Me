import express from "express";

import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.route("/").get(getComments);
router.route("/").post(createComment);
router.route("/").put(updateComment);
router.route("/").delete(deleteComment);

export default router;
