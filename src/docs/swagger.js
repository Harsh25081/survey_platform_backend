// src/docs/swagger.js
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerDefinition } from "./swaggerDef.js";

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // All route files will be scanned
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    `✅ Swagger Docs available at: http://localhost:${port}/api-docs`
  );
};
