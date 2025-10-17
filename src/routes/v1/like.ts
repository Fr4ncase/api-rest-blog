import { Router } from 'express';

import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';
import validationError from '@/middlewares/validationError';

import likeBlog from '@/controllers/v1/like/like_blog';

import { getBlogIdSchema } from '@/schemas/blog_schema';
import { getUserByIdSchema } from '@/schemas/user_schema';

const router = Router();

router.post(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  validationError(getBlogIdSchema, 'params'),
  validationError(getUserByIdSchema),
  likeBlog,
);

export default router;
