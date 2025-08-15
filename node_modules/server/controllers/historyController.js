import History from '../models/History.js';
import { historySaveSchema } from '../utils/validators.js';
import { HttpError } from '../utils/errors.js';

export const saveHistory = async (req, res, next) => {
  try {
    const payload = historySaveSchema.parse(req.body);
    const doc = await History.create({
      userId: payload.userId,
      role: payload.role,
      resumeText: payload.text,
      results: payload.results,
    });
    res.json({ id: doc._id });
  } catch (err) { next(err); }
};

export const getHistory = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new HttpError('userId required', 400);
    const docs = await History.find({ userId }).sort({ createdAt: -1 }).limit(25);
    res.json(docs);
  } catch (err) { next(err); }
};
