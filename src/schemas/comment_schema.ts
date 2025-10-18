import { z } from 'zod';
import { Types } from 'mongoose';

const contentSchema = z
  .string()
  .trim()
  .min(1, { error: 'Content is required' })
  .max(1000, { error: 'Content must be less than 1000 characters' });

export const postCommentSchema = z.object({
  content: contentSchema,
});

export const getCommentIdSchema = z.object({
  commentId: z.string().refine((value) => Types.ObjectId.isValid(value), {
    error: 'Invalid MongoDB ObjectId format',
  }),
});
