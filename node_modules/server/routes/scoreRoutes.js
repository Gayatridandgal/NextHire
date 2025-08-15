import { Router } from 'express';
import { scoreResume } from '../controllers/scoreController.js';

const router = Router();
router.post('/', scoreResume); // POST /api/score
export default router;
