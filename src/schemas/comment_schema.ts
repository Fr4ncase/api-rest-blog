import { z } from 'zod';

const contentSchema = z
  .string()
  .trim()
  .min(1, { error: 'Content is required' })
  .max(1000, { error: 'Content must be less than 1000 characters' });

export const postCommentSchema = z.object({
  content: contentSchema,
});
