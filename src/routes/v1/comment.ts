import { Router } from 'express';

import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';
import validationError from '@/middlewares/validationError';

import commentBlog from '@/controllers/v1/comment/comment_blog';

import { getBlogIdSchema } from '@/schemas/blog_schema';
import { postCommentSchema } from '@/schemas/comment_schema';

const router = Router();

router.post(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  validationError(getBlogIdSchema, 'params'),
  validationError(postCommentSchema),
  commentBlog,
);

export default router;
