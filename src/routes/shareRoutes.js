import express from "express";
import {
  shareSurvey,
  validateShareToken,
  markTokenUsed,
  getSurveyByToken,
} from "../controllers/shareController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ShareSurvey
 *   description: Endpoints for sharing surveys and handling token-based access
 */

/**
 * @swagger
 * /api/share/{surveyId}:
 *   post:
 *     summary: Share a survey (public or personalized)
 *     description: Allows admin or user to share a survey either publicly or via personalized token links.
 *     tags: [ShareSurvey]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: surveyId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the survey to share
 *         example: "clta901v50003a123bcxyz001"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shareType
 *             properties:
 *               shareType:
 *                 type: string
 *                 enum: [public, personalized]
 *                 example: "personalized"
 *               recipients:
 *                 type: array
 *                 description: Required only for personalized share
 *                 items:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     mobile_no:
 *                       type: string
 *                       example: "+911234567890"
 *     responses:
 *       200:
 *         description: Public survey link generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: "public"
 *                 link:
 *                   type: string
 *                   example: "https://frontend.com/survey/clta901v50003a123bcxyz001"
 *       201:
 *         description: Personalized survey links generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: "personalized"
 *                 message:
 *                   type: string
 *                   example: "Survey shared successfully"
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                       mobile_no:
 *                         type: string
 *                         example: "+911234567890"
 *                       link:
 *                         type: string
 *                         example: "https://frontend.com/survey/clta901v50003a123bcxyz001?token=abc123xyz"
 *       400:
 *         description: Invalid share type or missing recipients
 *       404:
 *         description: Survey not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/share/{surveyId}/validate:
 *   post:
 *     summary: Validate a personalized share token
 *     description: Checks if a given token for a survey is valid, unused, and unexpired.
 *     tags: [ShareSurvey]
 *     parameters:
 *       - in: path
 *         name: surveyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The survey ID to validate token against
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "abc123xyz"
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: true
 *                 surveyId:
 *                   type: string
 *                   example: "clta901v50003a123bcxyz001"
 *                 recipient_email:
 *                   type: string
 *                   example: "user@example.com"
 *       400:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/share/mark-used:
 *   post:
 *     summary: Mark a personalized token as used
 *     description: Marks a token as used after a survey response submission to prevent reuse.
 *     tags: [ShareSurvey]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "abc123xyz"
 *     responses:
 *       200:
 *         description: Token successfully marked as used
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token marked as used"
 *       400:
 *         description: Token not found or already used
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/share/survey:
 *   get:
 *     summary: Get survey details via token (public endpoint)
 *     description: Fetches the full survey details and associated recipient data by verifying a share token.
 *     tags: [ShareSurvey]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The token value from the survey link
 *         example: "abc123xyz"
 *     responses:
 *       200:
 *         description: Survey and recipient information returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 survey:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "clta901v50003a123bcxyz001"
 *                     title:
 *                       type: string
 *                       example: "Customer Satisfaction Survey"
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "cltb111v50003a123bcxyz002"
 *                           question_text:
 *                             type: string
 *                             example: "How satisfied are you with our service?"
 *                           question_type:
 *                             type: string
 *                             example: "rating"
 *                 recipient:
 *                   type: string
 *                   example: "user@example.com"
 *       400:
 *         description: Invalid or expired token
 *       404:
 *         description: Survey not found
 *       500:
 *         description: Internal server error
 */

// Admin/User share survey
router.post("/:surveyId", protect, shareSurvey);

// Validate a token
router.post("/:surveyId/validate", validateShareToken);

// Mark token as used
router.post("/mark-used", markTokenUsed);

// Get survey via token (public endpoint)
router.get("/survey", getSurveyByToken);

export default router;
