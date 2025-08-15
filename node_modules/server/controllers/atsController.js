import { atsSchema } from '../utils/validators.js';
import { getATSuggestions } from '../services/geminiService.js';

export const atsSuggestions = async (req, res, next) => {
  try {
    const { text, role } = atsSchema.parse(req.body);
    const suggestions = await getATSuggestions(text, role);
    res.json(suggestions);
  } catch (err) { next(err); }
};
