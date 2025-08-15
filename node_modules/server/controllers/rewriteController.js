import { rewriteSchema } from '../utils/validators.js';
import { getRewrittenBullet } from '../services/geminiService.js';

export const rewriteLine = async (req, res, next) => {
  try {
    const { bullet, role } = rewriteSchema.parse(req.body);
    const rewritten = await getRewrittenBullet(bullet, role);
    res.json({ rewritten });
  } catch (err) { next(err); }
};
