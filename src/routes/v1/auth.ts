import { Router } from 'express';

import register from '@/controllers/v1/auth/register';
import login from '@/controllers/v1/auth/login';
import refreshToken from '@/controllers/v1/auth/refresh_token';
import logout from '@/controllers/v1/auth/logout';
import validationError from '@/middlewares/validationError';
import authenticate from '@/middlewares/authenticate';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from '@/schemas/auth_schema';

const router = Router();

router.post('/register', validationError(registerSchema), register);

router.post('/login', validationError(loginSchema), login);

router.post(
  '/refresh-token',
  validationError(refreshTokenSchema, 'cookies'),
  refreshToken,
);

router.post('/logout', authenticate, logout);

export default router;
