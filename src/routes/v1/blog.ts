import Router from 'express';
import multer from 'multer';

import createBlog from '@/controllers/v1/blog/create_blog';
import getAllBlogs from '@/controllers/v1/blog/get_all_blogs';
import getBlogsByUser from '@/controllers/v1/blog/get_blogs_by_user';

import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';
import validationError from '@/middlewares/validationError';
import uploadBlogBanner from '@/middlewares/uploadBlogBanner';

import { blogSchema } from '@/schemas/blog_schema';
import { getAllUserSchema, getUserByIdSchema } from '@/schemas/user_schema';

const upload = multer();

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['admin', 'user']),
  upload.single('banner_image'),
  validationError(blogSchema),
  uploadBlogBanner('post'),
  createBlog,
);

router.get(
  '/',
  authenticate,
  authorize(['admin', 'user']),
  validationError(getAllUserSchema, 'query'),
  getAllBlogs,
);

router.get(
  '/user/:userId',
  authenticate,
  authorize(['admin', 'user']),
  validationError(getUserByIdSchema, 'params'),
  validationError(getAllUserSchema, 'query'),
  getBlogsByUser,
);

export default router;
