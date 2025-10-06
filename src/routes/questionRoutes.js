import express from "express";
import { addQuestion } from "../controllers/questionController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/:surveyId", protect, addQuestion);

export default router;
