import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createAlert,
  getAlerts,
  getAlert,
  updateAlert,
  deleteAlert,
} from "../controllers/alertController.js";

const router = express.Router();

router.get("/", protect, getAlerts);

router.post("/", protect, createAlert);

router.get("/:id", protect, getAlert);

router.put("/:id", protect, updateAlert);

router.delete(
  "/:id",
  protect,
  deleteAlert
);

export default router;