import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'WRITER'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const article = await prisma.article.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Check if user can access this article
    if (session.user.role === 'WRITER' && article.authorId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'WRITER'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Check if article exists and user has permission
    const existingArticle = await prisma.article.findUnique({
      where: { id: params.id },
    });

    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    if (session.user.role === 'WRITER' && existingArticle.authorId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Prepare update data
    const updateData: any = { ...body };

    // Handle status changes
    if (body.status === 'PUBLISHED' && existingArticle.status !== 'PUBLISHED') {
      updateData.publishedAt = new Date();
    } else if (body.status !== 'PUBLISHED') {
      updateData.publishedAt = null;
    }

    // If slug is being updated, check for conflicts
    if (body.slug && body.slug !== existingArticle.slug) {
      const slugConflict = await prisma.article.findUnique({
        where: { slug: body.slug },
      });

      if (slugConflict) {
        return NextResponse.json(
          { error: "An article with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const updatedArticle = await prisma.article.update({
      where: { id: params.id },
      data: updateData,
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
        action: 'UPDATE',
        entity: 'Article',
        entityId: updatedArticle.id,
        details: {
          title: updatedArticle.title,
          status: updatedArticle.status,
          changes: Object.keys(body),
        },
      },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'WRITER'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if article exists and user has permission
    const article = await prisma.article.findUnique({
      where: { id: params.id },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    if (session.user.role === 'WRITER' && article.authorId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.article.delete({
      where: { id: params.id },
    });

    // Log the activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'DELETE',
        entity: 'Article',
        entityId: article.id,
        details: {
          title: article.title,
        },
      },
    });

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}