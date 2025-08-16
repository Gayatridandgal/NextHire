// services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config.js";

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

async function safeGenerate(prompt) {
  try {
    const resp = await model.generateContent(prompt);
    return resp.response.text();
  } catch (err) {
    console.error("❌ Gemini error:", err.response?.data || err.message || err);
    if (err.status === 429) {
      throw new Error("Rate limit reached. Please wait and try again.");
    }
    throw new Error("Gemini request failed");
  }
}

export async function analyzeResume(text, role, bullet = "") {
  const prompt = `
You are an AI resume analyzer.
1. Fit score: <score>|<reason>
2. ATS JSON (keywordsToAdd, sectionsMissing, formattingTips, redFlags).
3. Rewrite this line for '${role}': "${bullet}"
Resume:
${text}
`;

  const raw = await safeGenerate(prompt);

  let score = 0, reason = "N/A", ats = {}, rewritten = "";

  try {
    const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);

    // Score section
    const scoreLine = lines.find(l => l.includes("|"));
    if (scoreLine) {
      const [s, r] = scoreLine.split("|").map(x => x.trim());
      score = parseInt(s, 10) || 0;
      reason = r || "";
    }

    // JSON block
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonStr = raw.slice(jsonStart, jsonEnd + 1);
      ats = JSON.parse(jsonStr);
    }

    // Last line = rewrite
    rewritten = lines[lines.length - 1] || "";
  } catch (err) {
    console.error("⚠️ Failed to parse Gemini output:", raw);
  }

  return { score, reason, ats, rewritten, raw };
}
