import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { isFeatureEnabled } from '@/lib/settings';

// Validation schema
const NewsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.enum(['WEBSITE', 'COMING_SOON', 'CONTACT_FORM', 'SOCIAL_MEDIA', 'REFERRAL', 'OTHER']).optional(),
  name: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check if newsletter is enabled
    const newsletterEnabled = await isFeatureEnabled('newsletter');
    if (!newsletterEnabled) {
      return NextResponse.json(
        { error: 'Newsletter subscription is currently disabled' },
        { status: 503 }
      );
    }

    const body = await request.json();

    // Validate the request body
    const validatedData = NewsletterSchema.parse(body);

    // Get additional tracking information
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';

    // Check if email already exists
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email: validatedData.email },
    });

    if (existingSubscriber) {
      // If already subscribed and active
      if (existingSubscriber.isSubscribed) {
        return NextResponse.json(
          { message: 'You are already subscribed to our newsletter!' },
          { status: 200 }
        );
      }

      // If previously unsubscribed, resubscribe them
      const updatedSubscriber = await prisma.newsletter.update({
        where: { email: validatedData.email },
        data: {
          isSubscribed: true,
          subscribedAt: new Date(),
          unsubscribedAt: null,
          ipAddress,
          userAgent,
          referrer,
        },
      });

      // Also create or update lead record
      await prisma.lead.upsert({
        where: { email: validatedData.email },
        update: {
          newsletterId: updatedSubscriber.id,
          source: validatedData.source || 'COMING_SOON',
        },
        create: {
          email: validatedData.email,
          newsletterId: updatedSubscriber.id,
          source: validatedData.source || 'COMING_SOON',
          status: 'NEW',
        },
      });

      return NextResponse.json(
        { message: 'Welcome back! You have been resubscribed to our newsletter.' },
        { status: 200 }
      );
    }

    // Create new subscriber
    const newSubscriber = await prisma.newsletter.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        source: validatedData.source || 'COMING_SOON',
        ipAddress,
        userAgent,
        referrer,
        utmSource: validatedData.utmSource,
        utmMedium: validatedData.utmMedium,
        utmCampaign: validatedData.utmCampaign,
        utmTerm: validatedData.utmTerm,
        utmContent: validatedData.utmContent,
        tags: [],
      },
    });

    // Create lead record for sales dashboard
    await prisma.lead.create({
      data: {
        email: validatedData.email,
        newsletterId: newSubscriber.id,
        source: validatedData.source || 'COMING_SOON',
        status: 'NEW',
      },
    });

    // Log the activity
    await prisma.activityLog.create({
      data: {
        action: 'NEWSLETTER_SUBSCRIPTION',
        entity: 'Newsletter',
        entityId: newSubscriber.id,
        details: {
          email: validatedData.email,
          source: validatedData.source || 'COMING_SOON',
        },
        ipAddress,
        userAgent,
      },
    });

    return NextResponse.json(
      {
        message: 'Successfully subscribed to our newsletter!',
        subscriber: {
          email: newSubscriber.email,
          subscribedAt: newSubscriber.subscribedAt,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // This endpoint should be protected in production
    // For now, we'll allow it for testing

    const subscribers = await prisma.newsletter.findMany({
      where: { isSubscribed: true },
      orderBy: { subscribedAt: 'desc' },
      take: 100,
      select: {
        id: true,
        email: true,
        name: true,
        source: true,
        subscribedAt: true,
        tags: true,
      },
    });

    const totalCount = await prisma.newsletter.count({
      where: { isSubscribed: true },
    });

    return NextResponse.json({
      subscribers,
      totalCount,
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}