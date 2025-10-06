import express from "express";
import { addQuestion } from "../controllers/questionController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Endpoints for managing survey questions
 */

/**
 * @swagger
 * /api/questions/{surveyId}:
 *   post:
 *     summary: Add a new question to a survey
 *     description: Creates a new question under a specific survey and increments the survey's question count.
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: surveyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the survey
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question_type
 *               - question_text
 *             properties:
 *               question_type:
 *                 type: string
 *                 enum: [text, multiple_choice, checkbox, media]
 *                 example: multiple_choice
 *               question_text:
 *                 type: string
 *                 example: "What is your favorite color?"
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Red", "Blue", "Green"]
 *               media:
 *                 type: string
 *                 description: Optional image/video URL associated with the question
 *                 example: "https://example.com/image.png"
 *     responses:
 *       201:
 *         description: Question successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "clt7x09v50003a123bcxyz789"
 *                 surveyId:
 *                   type: string
 *                   example: "clt7x09v50003a123bcxyz001"
 *                 question_type:
 *                   type: string
 *                   example: multiple_choice
 *                 question_text:
 *                   type: string
 *                   example: "What is your favorite color?"
 *                 options:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Red", "Blue", "Green"]
 *                 media:
 *                   type: string
 *                   example: "https://example.com/image.png"
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized – missing or invalid token
 *       500:
 *         description: Internal server error
 */

router.post("/:surveyId", protect, addQuestion);

export default router;
