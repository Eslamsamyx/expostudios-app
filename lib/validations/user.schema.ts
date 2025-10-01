import { z } from 'zod';
import { Role } from '@prisma/client';

/**
 * Password validation with security requirements
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password must be less than 100 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

/**
 * Email validation
 */
export const emailSchema = z.string().email('Invalid email address').toLowerCase().trim();

/**
 * User creation schema
 */
export const createUserSchema = z.object({
  email: emailSchema,
  name: z.string().min(1, 'Name is required').max(100, 'Name too long').trim().optional(),
  password: passwordSchema,
  role: z.nativeEnum(Role).optional(),
});

/**
 * User update schema (all fields optional)
 */
export const updateUserSchema = z.object({
  email: emailSchema.optional(),
  name: z.string().min(1).max(100).trim().optional().nullable(),
  password: passwordSchema.optional(),
  role: z.nativeEnum(Role).optional(),
  isActive: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  avatar: z.string().url('Invalid avatar URL').optional().nullable(),
  bio: z.string().max(500, 'Bio too long').trim().optional().nullable(),
});

/**
 * Login credentials schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

/**
 * Password reset schema
 */
export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
