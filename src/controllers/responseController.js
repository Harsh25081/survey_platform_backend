import prisma from "../config/db.js";

export const submitResponse = async (req, res) => {
  try {
    const { surveyId, answers, user_metadata } = req.body;
    const response = await prisma.response.create({
      data: { surveyId, user_metadata },
    });

    for (const ans of answers) {
      await prisma.responseAnswer.create({
        data: {
          responseId: response.id,
          questionId: ans.questionId,
          answer_type: ans.answer_type,
          answer_value: ans.answer_value,
          media: ans.media || [],
        },
      });
    }

    res.status(201).json({ message: "Response submitted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
