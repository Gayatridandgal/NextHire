import { Router } from 'express';
import { saveHistory, getHistory } from '../controllers/historyController.js';

const router = Router();
router.post('/', saveHistory);             // POST /api/history
router.get('/:userId', getHistory);        // GET /api/history/:userId
export default router;
