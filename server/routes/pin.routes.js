import express from "express";

import {
  getPins,
  filterPins,
  createPin,
  updatePin,
  deletePin,
} from "../controllers/pin.controller.js";

const router = express.Router();

router.route("/filter").get(filterPins);
router.route("/").get(getPins);
router.route("/:id").get(getPins);

router.route("/").post(createPin);
router.route("/").put(updatePin);
router.route("/:id").delete(deletePin);

export default router;
