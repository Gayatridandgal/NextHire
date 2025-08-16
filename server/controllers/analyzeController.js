// controllers/analyzeController.js
import { analyzeResume } from "../services/geminiService.js";

export async function analyzeHandler(req, res) {
  try {
    const { text, role, bullet } = req.body;
    if (!text || !role) {
      return res.status(400).json({ error: "Missing resume text or role" });
    }

    const result = await analyzeResume(text, role, bullet);
    res.json(result);
  } catch (err) {
    console.error("❌ Analysis failed:", err.message || err);
    res.status(500).json({ error: "Gemini analysis failed" });
  }
}
