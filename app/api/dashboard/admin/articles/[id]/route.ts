import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const article = await prisma.article.findUnique({
      where: {
        id: params.id,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
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

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Extract and validate fields
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      metaTitle,
      metaDescription,
      keywords,
      status,
      publishedAt,
      featuredAt,
      authorId,
      category,
      tags,
      allowComments,
      isPremium,
    } = body;

    // Check if slug is unique (if changed)
    if (slug) {
      const existingArticle = await prisma.article.findFirst({
        where: {
          slug,
          NOT: {
            id: params.id,
          },
        },
      });

      if (existingArticle) {
        return NextResponse.json(
          { error: "An article with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
      ...(excerpt !== undefined && { excerpt }),
      ...(content !== undefined && { content }),
      ...(coverImage !== undefined && { coverImage }),
      ...(metaTitle !== undefined && { metaTitle }),
      ...(metaDescription !== undefined && { metaDescription }),
      ...(keywords !== undefined && { keywords }),
      ...(status !== undefined && { status }),
      ...(publishedAt !== undefined && { publishedAt }),
      ...(featuredAt !== undefined && { featuredAt }),
      ...(authorId !== undefined && { authorId }),
      ...(category !== undefined && { category }),
      ...(tags !== undefined && { tags }),
      ...(allowComments !== undefined && { allowComments }),
      ...(isPremium !== undefined && { isPremium }),
    };

    // Update the article
    const updatedArticle = await prisma.article.update({
      where: {
        id: params.id,
      },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'UPDATE',
        entity: 'Article',
        entityId: params.id,
        details: {
          title: updatedArticle.title,
          status: updatedArticle.status,
          changes: Object.keys(updateData),
          updatedBy: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
          },
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
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get article details before deletion
    const article = await prisma.article.findUnique({
      where: {
        id: params.id,
      },
      select: {
        title: true,
        slug: true,
        author: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Delete the article
    await prisma.article.delete({
      where: {
        id: params.id,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'DELETE',
        entity: 'Article',
        entityId: params.id,
        details: {
          title: article.title,
          slug: article.slug,
          originalAuthor: article.author.name || article.author.email,
          deletedBy: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}