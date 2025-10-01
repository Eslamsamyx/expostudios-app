import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateReadingTime } from '@/lib/utils/readingTime';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Fetch article
    const article = await prisma.article.findUnique({
      where: {
        slug,
        status: 'PUBLISHED',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            bio: true,
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.article.update({
      where: { id: article.id },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    // Get related articles (same category, exclude current)
    const relatedArticles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        category: article.category,
        id: {
          not: article.id,
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            bio: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 3,
    });

    // Add reading time
    const articleWithReadingTime = {
      ...article,
      readingTime: calculateReadingTime(article.content),
      views: article.views + 1, // Return updated view count
    };

    const relatedWithReadingTime = relatedArticles.map((a) => ({
      ...a,
      readingTime: calculateReadingTime(a.content),
    }));

    return NextResponse.json({
      article: articleWithReadingTime,
      relatedArticles: relatedWithReadingTime,
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}
