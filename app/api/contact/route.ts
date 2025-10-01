import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schema
const contactSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Get client IP and user agent for tracking
    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        email: validatedData.email,
        phone: validatedData.phone || null,
        company: validatedData.company || null,
        source: 'CONTACT_FORM',
        projectType: validatedData.projectType || null,
        budget: validatedData.budget || null,
        timeline: validatedData.timeline || null,
        message: validatedData.message,
        status: 'NEW',
        score: 50, // Default score for contact form submissions
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: 'CONTACT_FORM_SUBMISSION',
        entity: 'Lead',
        entityId: lead.id,
        details: {
          name: validatedData.name,
          projectType: validatedData.projectType,
        },
        ipAddress,
        userAgent,
      },
    });

    // TODO: Send email notification to sales team
    // TODO: Send confirmation email to user

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        leadId: lead.id
      },
      { status: 201 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.issues
        },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit contact form. Please try again later.'
      },
      { status: 500 }
    );
  }
}
