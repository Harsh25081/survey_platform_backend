import express from "express";
import {
  createSurvey,
  getUserSurveys,
} from "../controllers/surveyController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, createSurvey);
router.get("/", protect, getUserSurveys);

export default router;
