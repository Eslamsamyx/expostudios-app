import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { createErrorResponse } from "@/lib/errors";

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

    // Get the user with all related data
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      include: {
        activities: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 100,
        },
        articles: {
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove sensitive data (password field excluded from response)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userData } = user;

    // Log the export activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'EXPORT',
        entity: 'User',
        entityId: params.id,
        details: `Exported data for user: ${user.email}`,
      },
    });

    return NextResponse.json(userData);
  } catch (error) {
    return createErrorResponse(error, 'User Export');
  }
}