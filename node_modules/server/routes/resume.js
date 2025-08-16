import express from "express";
import multer from "multer";
import fs from "fs/promises";
import pdfParse from "pdf-parse";

const router = express.Router();

// ✅ store file in memory (not disk) so we can parse buffer
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload-resume", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Parse PDF (only PDF for now)
    if (req.file.mimetype === "application/pdf") {
      const data = await pdfParse(req.file.buffer);
      return res.json({ text: data.text });
    }

    // (Optional) Handle DOCX later
    return res.status(400).json({ error: "Only PDF supported right now" });
  } catch (err) {
    console.error("❌ Resume parsing failed:", err);
    res.status(500).json({ error: "Failed to parse resume" });
  }
});

export default router;
