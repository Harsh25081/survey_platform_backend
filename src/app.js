import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import surveyRoutes from "./routes/surveyRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import shareRoutes from "./routes/shareRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import { swaggerDocs } from "./docs/swagger.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/share", shareRoutes);
app.use("/api/reports", reportRoutes);

// SWAGGER DOCS
swaggerDocs(app, process.env.PORT || 5000);

export default app;
