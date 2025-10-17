import { Router } from 'express';
import multer from 'multer';

import createBlog from '@/controllers/v1/blog/create_blog';
import getAllBlogs from '@/controllers/v1/blog/get_all_blogs';
import getBlogsByUser from '@/controllers/v1/blog/get_blogs_by_user';
import getBlogBySlug from '@/controllers/v1/blog/get_blog_by_slug';
import updateBlog from '@/controllers/v1/blog/update_blog';
import deleteBlog from '@/controllers/v1/blog/delete_blog';

import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';
import validationError from '@/middlewares/validationError';
import uploadBlogBanner from '@/middlewares/uploadBlogBanner';

import {
  postBlogSchema,
  getSlugSchema,
  getBlogIdSchema,
  putBlogSchema,
} from '@/schemas/blog_schema';
import { getAllUserSchema, getUserByIdSchema } from '@/schemas/user_schema';

const upload = multer();

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['admin', 'user']),
  upload.single('banner_image'),
  validationError(postBlogSchema),
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

router.get(
  '/:slug',
  authenticate,
  authorize(['admin', 'user']),
  validationError(getSlugSchema, 'params'),
  getBlogBySlug,
);

router.put(
  '/:blogId',
  authenticate,
  authorize(['admin']),
  validationError(getBlogIdSchema, 'params'),
  upload.single('banner_image'),
  validationError(putBlogSchema),
  uploadBlogBanner('put'),
  updateBlog,
);

router.delete(
  '/:blogId',
  authenticate,
  authorize(['admin']),
  validationError(getBlogIdSchema, 'params'),
  deleteBlog,
);

export default router;
