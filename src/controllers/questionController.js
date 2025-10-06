import prisma from "../config/db.js";

export const addQuestion = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const { question_type, question_text, options, media } = req.body;

    const question = await prisma.question.create({
      data: {
        surveyId,
        question_type,
        question_text,
        options,
        media,
      },
    });

    await prisma.survey.update({
      where: { id: surveyId },
      data: { no_of_questions: { increment: 1 } },
    });

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
