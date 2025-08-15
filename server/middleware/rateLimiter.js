import rateLimit from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  limit: 120,          // 120 requests/min
  standardHeaders: true,
  legacyHeaders: false,
});
