import { z } from 'zod';
import { LeadSource } from '@prisma/client';

/**
 * Newsletter subscription schema
 */
export const newsletterSubscribeSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  name: z.string().max(100, 'Name too long').trim().optional(),
  source: z.nativeEnum(LeadSource).optional(),
  utmSource: z.string().max(100).trim().optional(),
  utmMedium: z.string().max(100).trim().optional(),
  utmCampaign: z.string().max(100).trim().optional(),
  utmTerm: z.string().max(100).trim().optional(),
  utmContent: z.string().max(100).trim().optional(),
});

/**
 * Newsletter update schema
 */
export const updateNewsletterSchema = z.object({
  name: z.string().max(100).trim().optional().nullable(),
  isSubscribed: z.boolean().optional(),
  tags: z.array(z.string().max(50).trim()).max(20, 'Maximum 20 tags').optional(),
});

export type NewsletterSubscribeInput = z.infer<typeof newsletterSubscribeSchema>;
export type UpdateNewsletterInput = z.infer<typeof updateNewsletterSchema>;
