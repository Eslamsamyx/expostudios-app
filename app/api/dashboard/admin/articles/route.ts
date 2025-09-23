import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Authenticate and authorize admin access
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all articles with full author information
    const articles = await prisma.article.findMany({
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            avatar: true,
            bio: true,
            isActive: true,
            createdAt: true,
            lastLoginAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Log admin activity for audit trail
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'VIEW',
        entity: 'Article',
        details: `Admin viewed articles list (${articles.length} articles)`,
      },
    });

    return NextResponse.json({
      articles,
      total: articles.length,
      metadata: {
        fetchedAt: new Date().toISOString(),
        adminId: session.user.id,
      },
    });
  } catch (error) {
    console.error("Error fetching articles for admin:", error);

    // Log error for monitoring
    try {
      const session = await getServerSession(authOptions);
      if (session?.user?.id) {
        await prisma.activityLog.create({
          data: {
            userId: session.user.id,
            action: 'ERROR',
            entity: 'Article',
            details: `Failed to fetch articles: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        });
      }
    } catch (logError) {
      console.error("Failed to log error activity:", logError);
    }

    return NextResponse.json(
      {
        error: "Failed to fetch articles",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}