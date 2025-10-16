import { z } from 'zod';
import { Types } from 'mongoose';

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

export const postBlogSchema = z.object({
  title: titleSchema,
  content: contentSchema,
  status: statusSchema,
});

export const getSlugSchema = z.object({
  slug: z.string({ error: 'Slug is required' }).min(1),
});

export const getBlogIdSchema = z.object({
  blogId: z.string().refine((value) => Types.ObjectId.isValid(value), {
    error: 'Invalid MongoDB ObjectId format',
  }),
});

export const putBlogSchema = z.object({
  title: titleSchema.optional(),
  content: contentSchema.optional(),
  status: statusSchema,
});
