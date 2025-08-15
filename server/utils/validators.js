import { z } from 'zod';

export const scoreSchema = z.object({
  text: z.string().min(20, 'Resume text too short'),
  role: z.string().min(2),
});

export const atsSchema = z.object({
  text: z.string().min(20),
  role: z.string().min(2),
});

export const rewriteSchema = z.object({
  bullet: z.string().min(5),
  role: z.string().min(2),
});

export const historySaveSchema = z.object({
  userId: z.string().min(1),
  role: z.string().min(2),
  text: z.string().min(20),
  results: z.any(),
});
