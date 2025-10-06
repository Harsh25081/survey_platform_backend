import prisma from "../config/db.js";

export const getSurveyReport = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const totalResponses = await prisma.response.count({ where: { surveyId } });
    const questions = await prisma.question.findMany({
      where: { surveyId },
      include: { response_answers: true },
    });

    res.json({ totalResponses, questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
