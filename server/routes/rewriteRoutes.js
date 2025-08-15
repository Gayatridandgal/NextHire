import { Router } from 'express';
import { rewriteLine } from '../controllers/rewriteController.js';

const router = Router();
router.post('/', rewriteLine); // POST /api/rewrite
export default router;
