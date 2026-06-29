import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createTraffic,
  getTraffic,
  getTrafficById,
  updateTraffic,
  deleteTraffic,
} from "../controllers/monitoringController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createTraffic
);

router.get(
  "/",
  protect,
  getTraffic
);

router.get(
  "/:id",
  protect,
  getTrafficById
);

router.put(
  "/:id",
  protect,
  updateTraffic
);

router.delete(
  "/:id",
  protect,
  deleteTraffic
);

export default router;