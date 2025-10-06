import express from "express";
import { getSurveyReport } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Endpoints related to survey reports and analytics
 */

/**
 * @swagger
 * /api/reports/{surveyId}:
 *   get:
 *     summary: Get survey report with total responses and detailed question data
 *     description: Fetches analytics for a specific survey including the number of responses and all questions with their respective answers.
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: surveyId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the survey
 *         example: "clt8x09v50003a123bcxyz001"
 *     responses:
 *       200:
 *         description: Successfully fetched the survey report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalResponses:
 *                   type: integer
 *                   example: 45
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "clt8x0a2v0005a123bcxyz100"
 *                       surveyId:
 *                         type: string
 *                         example: "clt8x09v50003a123bcxyz001"
 *                       question_type:
 *                         type: string
 *                         example: multiple_choice
 *                       question_text:
 *                         type: string
 *                         example: "What is your favorite programming language?"
 *                       options:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["JavaScript", "Python", "C++", "Go"]
 *                       media:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       response_answers:
 *                         type: array
 *                         description: List of responses for this question
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "clt8x0a2v0008a123bcxyz900"
 *                             userId:
 *                               type: string
 *                               example: "clt8x0b2v0012a123bcxyz455"
 *                             answer_text:
 *                               type: string
 *                               example: "JavaScript"
 *       401:
 *         description: Unauthorized – missing or invalid token
 *       404:
 *         description: Survey not found
 *       500:
 *         description: Internal server error
 */

router.get("/:surveyId", protect, getSurveyReport);

export default router;
