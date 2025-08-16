import { Router } from 'express';
import uploadRoutes from './uploadRoutes.js';
// import scoreRoutes from './scoreRoutes.js';
// import atsRoutes from './atsRoutes.js';
// import rewriteRoutes from './rewriteRoutes.js';
import historyRoutes from './historyRoutes.js';

const router = Router();

router.use('/upload', uploadRoutes);
// router.use('/score', scoreRoutes);
// router.use('/ats', atsRoutes);
// router.use('/rewrite', rewriteRoutes);
router.use('/history', historyRoutes);

export default router;
