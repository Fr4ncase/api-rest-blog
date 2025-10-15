import { z } from 'zod';

const titleSchema = z
  .string({ error: 'Title is required' })
  .trim()
  .min(1)
  .max(180, { error: 'Title must be less than 180 characters' });

const contentSchema = z.string({ error: 'Content is required' }).trim().min(1);

const statusSchema = z
  .enum(['draft', 'published'], {
    error: 'Status must be one of the value, draft or published',
  })
  .optional();

export const blogSchema = z.object({
  title: titleSchema,
  content: contentSchema,
  status: statusSchema,
});
