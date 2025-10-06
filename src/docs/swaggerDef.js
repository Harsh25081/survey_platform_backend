// src/docs/swaggerDef.js
export const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Survey Platform API",
    version: "1.0.0",
    description:
      "API documentation for the full Survey Platform backend (Users, Surveys, Responses, Share Tokens)",
    contact: {
      name: "Survey Platform Dev Team",
      email: "support@surveyplatform.com",
    },
  },
  servers: [
    {
      url: process.env.BASE_URL || "http://localhost:5000",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};
