import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Find and update article
    const article = await prisma.article.findUnique({
      where: {
        slug,
        status: 'PUBLISHED',
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Increment share count
    const updated = await prisma.article.update({
      where: { id: article.id },
      data: {
        shares: {
          increment: 1,
        },
      },
      select: {
        shares: true,
      },
    });

    return NextResponse.json({
      shares: updated.shares,
    });
  } catch (error) {
    console.error('Error updating share count:', error);
    return NextResponse.json(
      { error: 'Failed to update share count' },
      { status: 500 }
    );
  }
}
