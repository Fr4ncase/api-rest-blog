import { Router } from 'express';

import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';
import validationError from '@/middlewares/validationError';

import commentBlog from '@/controllers/v1/comment/comment_blog';
import getCommentsByBlog from '@/controllers/v1/comment/get_comments_by_blog';
import deleteComment from '@/controllers/v1/comment/delete_comment';

import { getBlogIdSchema } from '@/schemas/blog_schema';
import { postCommentSchema } from '@/schemas/comment_schema';
import { getCommentIdSchema } from '@/schemas/comment_schema';

const router = Router();

router.post(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  validationError(getBlogIdSchema, 'params'),
  validationError(postCommentSchema),
  commentBlog,
);

router.get(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  validationError(getBlogIdSchema, 'params'),
  getCommentsByBlog,
);

router.delete(
  '/:commentId',
  authenticate,
  authorize(['admin', 'user']),
  validationError(getCommentIdSchema, 'params'),
  deleteComment,
);

export default router;
