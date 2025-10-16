import { z } from 'zod';
import User from '@/models/user';
import { Types } from 'mongoose';

const usernameSchema = z
  .string()
  .trim()
  .max(20, { error: 'Username must be less than 20 characters' })
  .optional();

const emailSchema = z
  .email({ error: 'Invalid email address' })
  .max(50, { error: 'Email mustb be less than 50 characters' })
  .optional();

const passwordSchema = z
  .string()
  .min(8, { error: 'Password must be at less 8 characters long' })
  .max(100, { error: 'Password must be less than 50 characters' })
  .optional();

const firstNameSchema = z
  .string()
  .max(20, { error: 'First name must be less than 20 characters' })
  .optional();

const lastNameSchema = z
  .string()
  .max(20, { error: 'Last name must be less than 20 characters' })
  .optional();

const socialLinkSchema = z
  .url({ error: 'Invalid URL' })
  .max(100, { error: 'Url must be less than 100 characters' })
  .optional();

export const putCurrentUserSchema = z.object({
  username: usernameSchema.refine(
    async (value) => {
      if (!value) return true;
      const userExists = await User.exists({ username: value });
      return !userExists;
    },
    {
      error: 'This username is already in use',
    },
  ),
  email: emailSchema.refine(
    async (value) => {
      if (!value) return true;
      const userExists = await User.exists({ email: value });
      return !userExists;
    },
    {
      error: 'This email is already in use',
    },
  ),
  password: passwordSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  website: socialLinkSchema,
  facebook: socialLinkSchema,
  instagram: socialLinkSchema,
  linkedin: socialLinkSchema,
  x: socialLinkSchema,
  youtube: socialLinkSchema,
});

const limitSchema = z.coerce
  .number({
    error: 'Limit must be a number',
  })
  .int({
    error: 'Limit must be an integer',
  })
  .min(1, {
    error: 'Limit must be between 1 to 50',
  })
  .max(50, {
    error: 'Limit must be between 1 to 50',
  })
  .optional();

const offsetSchema = z.coerce
  .number({
    error: 'offset must be a number',
  })
  .int({
    error: 'offset must be an integer',
  })
  .min(0, {
    error: 'offset must be a positive integer',
  })
  .optional();

export const getAllUserSchema = z.object({
  limit: limitSchema,
  offset: offsetSchema,
});

const userIdSchema = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    error: 'Invalid MongoDB ObjectId format',
  });

export const getUserByIdSchema = z.object({
  userId: userIdSchema,
});

export const deleteUserByIdSchema = z.object({
  userId: userIdSchema,
});
