// routes/analyze.js
import express from "express";
import { analyzeHandler } from "../controllers/analyzeController.js";

const router = express.Router();

router.post("/", analyzeHandler);

export default router;
