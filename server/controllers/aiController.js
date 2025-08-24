
// server/controllers/aiController.js
const { geminiText, extractJSON } = require('../services/geminiService');

// Helper: clamp score 0..100
const clampScore = n => Math.max(0, Math.min(100, Math.round(Number(n) || 0)));

exports.getCareerFitScore = async (req, res) => {
  try {
    const { resumeText, role = 'Software Developer', jobDescription = '' } = req.body;
    if (!resumeText) return res.status(400).json({ error: 'resumeText is required' });

    const prompt = `
You are an expert technical recruiter. Evaluate the following resume for the role: "${role}".
${jobDescription ? `Here is the job description:\n${jobDescription}\n` : ''}

TASK:
1) Give a single integer score between 0 and 100 representing career fit.
2) Provide a concise one-line reason.

OUTPUT (strict JSON):
{
  "score": <0-100>,
  "reason": "<one sentence>"
}

RESUME:
${resumeText}
`.trim();

    const text = await geminiText(prompt);
    const json = extractJSON(text);
    const score = clampScore(json.score ?? json?.Score ?? json?.fit ?? 0);
    const reason = json.reason || json?.Reason || 'Fit reason unavailable';
    return res.json({ score, reason });
  } catch (err) {
    console.error('Score error:', err.message);
    return res.status(500).json({ error: 'Failed to compute career fit score' });
  }
};

exports.getATSSuggestions = async (req, res) => {
  try {
    const { resumeText, role = 'Software Developer' } = req.body;
    if (!resumeText) return res.status(400).json({ error: 'resumeText is required' });

    const prompt = `
You are an ATS optimization expert. Analyze the resume below for the target role "${role}".
Return a JSON array of very specific, actionable suggestions. Each item should be a short sentence.

OUTPUT (strict JSON array):
[
  "Add Kubernetes and Terraform keywords if you have relevant experience.",
  "Quantify impact for performance optimizations (e.g., 30% faster).",
  "Normalize date formats (MMM YYYY)."
]

RESUME:
${resumeText}
`.trim();

    const text = await geminiText(prompt);
    const arr = extractJSON(text);
    if (!Array.isArray(arr)) {
      // force array
      const coerced = typeof arr === 'string' ? [arr] : Object.values(arr);
      return res.json({ suggestions: coerced });
    }
    return res.json({ suggestions: arr });
  } catch (err) {
    console.error('ATS error:', err.message);
    return res.status(500).json({ error: 'Failed to get ATS suggestions' });
  }
};

exports.getRewrites = async (req, res) => {
  try {
    const { role = 'Software Developer', bullets = [], resumeText = '' } = req.body;
    if (!bullets.length && !resumeText) {
      return res.status(400).json({ error: 'Provide bullets[] or resumeText' });
    }

    const prompt = `
You are a resume coach. Rewrite the provided bullets to be impact-oriented, quantified, and tailored for "${role}".
Return STRICT JSON with an array of { "original": string, "improved": string }.
Do not invent facts. If info is missing, improve style without fabrication.

INPUT BULLETS:
${bullets.length ? bullets.map((b, i) => `${i + 1}. ${b}`).join('\n') : '(none provided)'}

${resumeText ? `FULL RESUME CONTEXT:\n${resumeText}` : ''}

OUTPUT (strict JSON):
[
  { "original": "...", "improved": "..." }
]
`.trim();

    const text = await geminiText(prompt);
    const json = extractJSON(text);
    // normalize to array of {original, improved}
    let list = [];
    if (Array.isArray(json)) list = json;
    else if (json?.items && Array.isArray(json.items)) list = json.items;
    else if (json?.rewrites && Array.isArray(json.rewrites)) list = json.rewrites;

    list = list.map(item => ({
      original: item.original || '',
      improved: item.improved || item.rewrite || '',
    })).filter(x => x.improved);

    return res.json({ rewrites: list });
  } catch (err) {
    console.error('Rewrite error:', err.message);
    return res.status(500).json({ error: 'Failed to rewrite bullets' });
  }
};
