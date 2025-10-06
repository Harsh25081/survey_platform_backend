import prisma from "../config/db.js";
import {
  generatePlainToken,
  hashToken,
  compareToken,
} from "../utils/tokenUtils.js";
import jwt from "jsonwebtoken";

// =====================
// SHARE SURVEY
// =====================
export const shareSurvey = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const { shareType, recipients } = req.body;
    // shareType = "public" or "personalized"

    const survey = await prisma.survey.findUnique({ where: { id: surveyId } });
    if (!survey) return res.status(404).json({ message: "Survey not found" });

    // PUBLIC SHARE (just returns link)
    if (shareType === "public") {
      const publicUrl = `${process.env.FRONTEND_URL}/survey/${surveyId}`;
      return res.json({ type: "public", link: publicUrl });
    }

    // PERSONALIZED SHARE
    if (shareType === "personalized" && recipients?.length > 0) {
      const shareRecords = [];

      for (const r of recipients) {
        const plainToken = generatePlainToken();
        const tokenHash = await hashToken(plainToken);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7-day expiry

        const record = await prisma.shareToken.create({
          data: {
            surveyId,
            recipient_email: r.email || null,
            recipient_mobile: r.mobile_no || null,
            token_hash: tokenHash,
            expires_at: expiresAt,
          },
        });

        const link = `${process.env.FRONTEND_URL}/survey/${surveyId}?token=${plainToken}`;
        shareRecords.push({
          email: r.email,
          mobile_no: r.mobile_no,
          link,
        });
      }

      return res.status(201).json({
        type: "personalized",
        message: "Survey shared successfully",
        links: shareRecords,
      });
    }

    res.status(400).json({ message: "Invalid share type or recipients" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// VALIDATE TOKEN
// =====================
export const validateShareToken = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const { token } = req.body;

    const tokens = await prisma.shareToken.findMany({
      where: { surveyId, used: false },
    });

    let matchedToken = null;

    for (const t of tokens) {
      const match = await compareToken(token, t.token_hash);
      if (match) {
        matchedToken = t;
        break;
      }
    }

    if (!matchedToken)
      return res.status(400).json({ message: "Invalid or expired token" });

    if (
      matchedToken.expires_at &&
      new Date(matchedToken.expires_at) < new Date()
    ) {
      return res.status(400).json({ message: "Token expired" });
    }

    return res.json({
      valid: true,
      surveyId: matchedToken.surveyId,
      recipient_email: matchedToken.recipient_email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// MARK TOKEN AS USED (after submission)
// =====================
export const markTokenUsed = async (req, res) => {
  try {
    const { token } = req.body;
    const tokens = await prisma.shareToken.findMany({ where: { used: false } });

    for (const t of tokens) {
      const match = await compareToken(token, t.token_hash);
      if (match) {
        await prisma.shareToken.update({
          where: { id: t.id },
          data: { used: true },
        });
        return res.json({ message: "Token marked as used" });
      }
    }

    res.status(400).json({ message: "Token not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// GET SURVEY BY TOKEN (for frontend rendering)
// =====================
export const getSurveyByToken = async (req, res) => {
  try {
    const { token } = req.query;
    const tokens = await prisma.shareToken.findMany();

    let matchedToken = null;
    for (const t of tokens) {
      const match = await compareToken(token, t.token_hash);
      if (match) {
        matchedToken = t;
        break;
      }
    }

    if (!matchedToken)
      return res.status(400).json({ message: "Invalid or expired token" });

    const survey = await prisma.survey.findUnique({
      where: { id: matchedToken.surveyId },
      include: { questions: true },
    });

    if (!survey) return res.status(404).json({ message: "Survey not found" });

    res.json({ survey, recipient: matchedToken.recipient_email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
