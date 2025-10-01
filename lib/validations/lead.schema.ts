import { z } from 'zod';
import { LeadSource } from '@prisma/client';

/**
 * Lead creation schema
 */
export const createLeadSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number').optional().nullable(),
  company: z.string().max(200, 'Company name too long').trim().optional().nullable(),
  jobTitle: z.string().max(100, 'Job title too long').trim().optional().nullable(),
  source: z.nativeEnum(LeadSource),
  projectType: z.string().max(200).trim().optional().nullable(),
  budget: z.string().max(100).trim().optional().nullable(),
  timeline: z.string().max(200).trim().optional().nullable(),
  message: z.string().max(2000, 'Message too long').trim().optional().nullable(),
});

/**
 * Lead update schema
 */
export const updateLeadSchema = z.object({
  email: z.string().email().toLowerCase().trim().optional(),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number').optional().nullable(),
  company: z.string().max(200).trim().optional().nullable(),
  jobTitle: z.string().max(100).trim().optional().nullable(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST']).optional(),
  score: z.number().int().min(0).max(100).optional(),
  projectType: z.string().max(200).trim().optional().nullable(),
  budget: z.string().max(100).trim().optional().nullable(),
  timeline: z.string().max(200).trim().optional().nullable(),
  message: z.string().max(2000).trim().optional().nullable(),
  assignedTo: z.string().optional().nullable(),
  notes: z.string().max(5000).trim().optional().nullable(),
  nextFollowUp: z.string().datetime().or(z.date()).optional().nullable(),
  dealValue: z.number().min(0).optional().nullable(),
});

/**
 * Interaction creation schema
 */
export const createInteractionSchema = z.object({
  leadId: z.string().cuid(),
  type: z.enum(['EMAIL', 'CALL', 'MEETING', 'NOTE']),
  subject: z.string().max(200).trim().optional().nullable(),
  description: z.string().min(1, 'Description is required').max(5000).trim(),
  outcome: z.string().max(500).trim().optional().nullable(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type CreateInteractionInput = z.infer<typeof createInteractionSchema>;
