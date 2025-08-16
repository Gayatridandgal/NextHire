import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import apiRouter from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import dotenv from 'dotenv';
dotenv.config();
import resumeRoutes from "./routes/resume.js";
import analyzeRoutes from "./routes/analyze.js";
// import atsRoutes from "./routes/ats.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors({ origin: config.clientOrigin, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', apiRateLimiter);
app.use('/api', apiRouter);
// app.use('/api/ats', atsRoutes); // Enable ATS routes
app.use("/api", resumeRoutes);
app.use("/api/analyze", analyzeRoutes);
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});
app.get("/api/test", (req, res) => {
  res.json({ msg: "Backend connected on port 5000!" });
});

// 404 / Error handlers
app.use(notFound);
app.use(errorHandler);

// DB + Listen
mongoose.connect(config.mongoUri).then(() => {
  console.log('MongoDB connected');
  app.listen(config.port, () => {
    console.log(`Server listening on :${config.port}`);
  });
}).catch(err => {
  console.error('MongoDB connection error', err);
  process.exit(1);
});
