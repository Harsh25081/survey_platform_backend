import prisma from "../config/db.js";

export const createSurvey = async (req, res) => {
  try {
    const { title, description, flow_type, settings } = req.body;
    const survey = await prisma.survey.create({
      data: {
        title,
        description,
        flow_type,
        settings,
        userId: req.user.id,
      },
    });
    res.status(201).json(survey);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserSurveys = async (req, res) => {
  try {
    const surveys = await prisma.survey.findMany({
      where: { userId: req.user.id, is_deleted: false },
    });
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
