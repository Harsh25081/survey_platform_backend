import express from "express";
import {
  createSurvey,
  getUserSurveys,
} from "../controllers/surveyController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Surveys
 *   description: Manage user-created surveys
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Survey:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "a1b2c3d4"
 *         title:
 *           type: string
 *           example: "Customer Satisfaction Survey"
 *         description:
 *           type: string
 *           example: "A short survey to measure customer satisfaction levels."
 *         flow_type:
 *           type: string
 *           example: "sequential"
 *         settings:
 *           type: object
 *           example: { "allow_multiple_responses": false, "show_progress_bar": true }
 *         userId:
 *           type: string
 *           example: "user123"
 *         is_deleted:
 *           type: boolean
 *           example: false
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-10-06T12:00:00.000Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2025-10-06T12:00:00.000Z"
 */

/**
 * @swagger
 * /api/surveys:
 *   post:
 *     summary: Create a new survey
 *     tags: [Surveys]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - flow_type
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Product Feedback Survey"
 *               description:
 *                 type: string
 *                 example: "A quick survey to gather product feedback"
 *               flow_type:
 *                 type: string
 *                 example: "linear"
 *               settings:
 *                 type: object
 *                 example: { "allow_anonymous": true, "language": "en" }
 *     responses:
 *       201:
 *         description: Survey created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Survey'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get all surveys created by the logged-in user
 *     tags: [Surveys]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user surveys
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Survey'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */

router.post("/", protect, createSurvey);
router.get("/", protect, getUserSurveys);

export default router;
