import { getCareerFitScore } from '../services/geminiService.js';
import { scoreSchema } from '../utils/validators.js';

export const scoreResume = async (req, res, next) => {
  try {
    const { text, role } = scoreSchema.parse(req.body);
    const result = await getCareerFitScore(text, role);
    res.json(result);
  } catch (err) { next(err); }
};
