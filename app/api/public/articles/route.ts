import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateReadingTime } from '@/lib/utils/readingTime';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';

    // Build where clause
    const where: Record<string, unknown> = {
      status: 'PUBLISHED',
    };

    if (category && category !== 'all') {
      where.category = category;
    }

    if (tag && tag !== 'all') {
      where.tags = {
        has: tag,
      };
    }

    if (featured) {
      where.featuredAt = {
        not: null,
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch articles
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
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
        orderBy: [
          { featuredAt: 'desc' },
          { publishedAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.article.count({ where }),
    ]);

    // Add reading time to each article
    const articlesWithReadingTime = articles.map((article) => ({
      ...article,
      readingTime: calculateReadingTime(article.content),
    }));

    // Get all categories and tags for filter options
    const allArticles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        category: true,
        tags: true,
      },
    });

    const categories = Array.from(
      new Set(allArticles.map((a) => a.category).filter((c): c is string => c !== null))
    );

    const tags = Array.from(
      new Set(allArticles.flatMap((a) => a.tags))
    );

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      articles: articlesWithReadingTime,
      total,
      page,
      totalPages,
      categories,
      tags,
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
