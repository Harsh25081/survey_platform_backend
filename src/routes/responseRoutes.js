import express from "express";
import { submitResponse } from "../controllers/responseController.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Responses
 *   description: Endpoints for submitting and managing survey responses
 */

/**
 * @swagger
 * /api/responses:
 *   post:
 *     summary: Submit a survey response
 *     description: Allows a user to submit their answers to a survey. Supports multiple question types and optional media attachments.
 *     tags: [Responses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - surveyId
 *               - answers
 *             properties:
 *               surveyId:
 *                 type: string
 *                 example: "clt9y09v50003a123bcxyz001"
 *               user_metadata:
 *                 type: object
 *                 description: Optional metadata about the respondent
 *                 example:
 *                   name: "Jane Doe"
 *                   email: "jane@example.com"
 *                   device: "mobile"
 *               answers:
 *                 type: array
 *                 description: Array of answers for each question
 *                 items:
 *                   type: object
 *                   required:
 *                     - questionId
 *                     - answer_type
 *                   properties:
 *                     questionId:
 *                       type: string
 *                       example: "clt9y0b2v0012a123bcxyz102"
 *                     answer_type:
 *                       type: string
 *                       enum: [text, choice, media, rating]
 *                       example: "text"
 *                     answer_value:
 *                       type: string
 *                       example: "I really liked this product!"
 *                     media:
 *                       type: array
 *                       description: Optional media URLs (images, audio, or video)
 *                       items:
 *                         type: string
 *                       example: ["https://example.com/image1.png"]
 *     responses:
 *       201:
 *         description: Response successfully submitted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Response submitted"
 *       400:
 *         description: Bad request – invalid or missing data
 *       500:
 *         description: Internal server error
 */

router.post("/", submitResponse);

export default router;
