// server/routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const {
  getCareerFitScore,
  getATSSuggestions,
  getRewrites
} = require('../controllers/aiController');

router.post('/score', getCareerFitScore);
router.post('/ats-suggestions', getATSSuggestions);
router.post('/rewrite', getRewrites);

module.exports = router;
