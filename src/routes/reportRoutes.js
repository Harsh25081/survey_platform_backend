import express from "express";
import { getSurveyReport } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/:surveyId", protect, getSurveyReport);

export default router;
