import { z } from 'zod';
import User from '@/models/user';

const emailSchema = z
  .email({ error: 'Invalid email address' })
  .trim()
  .min(5, { error: 'Email is required' })
  .max(50, { error: 'Email must be less than 50 characters' });

const passwordSchema = z
  .string({ error: 'Password is required' })
  .min(8, { error: 'Password must be at least 8 characters long' })
  .max(100, { error: 'Password must be less than 50 characters' });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  email: emailSchema.refine(
    async (value) => {
      const userExists = await User.exists({ email: value });
      return !userExists;
    },
    {
      error: 'User email or password is invalid',
    },
  ),
  password: passwordSchema,
  role: z
    .enum(['admin', 'user'], {
      error: (issue) =>
        issue.input === undefined
          ? 'Role is required'
          : 'Role must be admin or user',
    })
    .default('user'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z
    .string({ error: 'Refresh token required' })
    .min(1)
    .refine(
      (value) => {
        try {
          const parts = value.split('.');
          return parts.length === 3;
        } catch {
          return false;
        }
      },
      {
        error: 'Invalid refresh token',
      },
    ),
});
