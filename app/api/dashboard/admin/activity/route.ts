import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '7d';

    // Calculate date filter
    let dateFilter = {};
    if (range !== 'all') {
      const now = new Date();
      const daysMap: Record<string, number> = {
        '1d': 1,
        '7d': 7,
        '30d': 30,
      };
      const days = daysMap[range] || 7;
      const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      dateFilter = {
        createdAt: {
          gte: startDate,
        },
      };
    }

    const logs = await prisma.activityLog.findMany({
      where: dateFilter,
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100, // Limit to last 100 entries
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch activity logs" },
      { status: 500 }
    );
  }
}