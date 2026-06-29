import express from "express";

import {
  register,
  login,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

import validate from "../middleware/validationMiddleware.js";

import {
  registerValidator,
  loginValidator,
} from "../utils/validators.js";

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

router.get(
  "/me",
  protect,
  (req, res) => {
    res.json(req.user);
  }
);

export default router;