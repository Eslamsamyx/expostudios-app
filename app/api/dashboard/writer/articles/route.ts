import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'WRITER'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For WRITER role, only show their own articles
    // For ADMIN role, show all articles
    const whereClause = session.user.role === 'WRITER'
      ? { authorId: session.user.id }
      : {};

    const articles = await prisma.article.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'WRITER'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      metaTitle,
      metaDescription,
      keywords,
      tags,
      category,
      coverImage,
      status,
      allowComments,
      isPremium,
      publishedAt,
    } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    if (slug) {
      const existingArticle = await prisma.article.findUnique({
        where: { slug },
      });

      if (existingArticle) {
        return NextResponse.json(
          { error: "An article with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Create the article
    const article = await prisma.article.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        metaTitle,
        metaDescription,
        keywords: keywords || [],
        tags: tags || [],
        category,
        coverImage,
        status: status || 'DRAFT',
        allowComments: allowComments !== undefined ? allowComments : true,
        isPremium: isPremium !== undefined ? isPremium : false,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Log the activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'CREATE',
        entity: 'Article',
        entityId: article.id,
        details: {
          title: article.title,
          status: article.status,
        },
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}