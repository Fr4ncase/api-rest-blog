import { Router } from 'express';

import getCurrentUser from '@/controllers/v1/user/get_current_user';
import updateCurrentUser from '@/controllers/v1/user/update_current_user';
import deleteCurrentUser from '@/controllers/v1/user/delete_current_user';
import getAllUser from '@/controllers/v1/user/get_all_user';
import getUser from '@/controllers/v1/user/get_user';
import deleteUser from '@/controllers/v1/user/deleteUser';

import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';
import validationError from '@/middlewares/validationError';

import {
  updateCurrentUserSchema,
  getAllUserSchema,
  getUserById,
  deleteUserById,
} from '@/schemas/user_schema';

const router = Router();

router.get(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  getCurrentUser,
);

router.put(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  validationError(updateCurrentUserSchema),
  updateCurrentUser,
);

router.delete(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  deleteCurrentUser,
);

router.get(
  '/',
  authenticate,
  authorize(['admin']),
  validationError(getAllUserSchema, 'query'),
  getAllUser,
);

router.get(
  '/:userId',
  authenticate,
  authorize(['admin']),
  validationError(getUserById, 'params'),
  getUser,
);

router.delete(
  '/:userId',
  authenticate,
  authorize(['admin']),
  validationError(deleteUserById, 'params'),
  deleteUser,
);

export default router;
