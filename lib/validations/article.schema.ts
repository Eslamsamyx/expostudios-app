import { z } from 'zod';
import { ArticleStatus } from '@prisma/client';

/**
 * Article creation schema
 */
export const createArticleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long').trim(),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format (use lowercase letters, numbers, and hyphens)')
    .trim(),
  excerpt: z.string().max(500, 'Excerpt too long').trim().optional().nullable(),
  content: z.string().min(1, 'Content is required'),
  coverImage: z.string().url('Invalid cover image URL').optional().nullable(),
  metaTitle: z.string().max(70, 'Meta title should be under 70 characters').trim().optional().nullable(),
  metaDescription: z.string().max(160, 'Meta description should be under 160 characters').trim().optional().nullable(),
  keywords: z.array(z.string().max(50).trim()).max(10, 'Maximum 10 keywords').optional(),
  status: z.nativeEnum(ArticleStatus).optional(),
  category: z.string().max(100).trim().optional().nullable(),
  tags: z.array(z.string().max(50).trim()).max(20, 'Maximum 20 tags').optional(),
  allowComments: z.boolean().optional(),
  isPremium: z.boolean().optional(),
  publishedAt: z.string().datetime().or(z.date()).optional().nullable(),
  featuredAt: z.string().datetime().or(z.date()).optional().nullable(),
});

/**
 * Article update schema (all fields optional)
 */
export const updateArticleSchema = z.object({
  title: z.string().min(1).max(200).trim().optional(),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format')
    .trim()
    .optional(),
  excerpt: z.string().max(500).trim().optional().nullable(),
  content: z.string().min(1).optional(),
  coverImage: z.string().url('Invalid cover image URL').optional().nullable(),
  metaTitle: z.string().max(70).trim().optional().nullable(),
  metaDescription: z.string().max(160).trim().optional().nullable(),
  keywords: z.array(z.string().max(50).trim()).max(10).optional(),
  status: z.nativeEnum(ArticleStatus).optional(),
  category: z.string().max(100).trim().optional().nullable(),
  tags: z.array(z.string().max(50).trim()).max(20).optional(),
  allowComments: z.boolean().optional(),
  isPremium: z.boolean().optional(),
  publishedAt: z.string().datetime().or(z.date()).optional().nullable(),
  featuredAt: z.string().datetime().or(z.date()).optional().nullable(),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
