import express from "express";
import {
  shareSurvey,
  validateShareToken,
  markTokenUsed,
  getSurveyByToken,
} from "../controllers/shareController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin/User share survey
router.post("/:surveyId", protect, shareSurvey);

// Validate a token
router.post("/:surveyId/validate", validateShareToken);

// Mark token as used
router.post("/mark-used", markTokenUsed);

// Get survey via token (public endpoint)
router.get("/survey", getSurveyByToken);

export default router;
