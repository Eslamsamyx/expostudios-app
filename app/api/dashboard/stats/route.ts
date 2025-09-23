import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get total newsletter subscribers
    const totalSubscribers = await prisma.newsletter.count({
      where: {
        isSubscribed: true,
      },
    });

    // Get new leads this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const newLeads = await prisma.lead.count({
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
        status: 'NEW',
      },
    });

    // Get published articles count
    const articlesPublished = await prisma.article.count({
      where: {
        status: 'PUBLISHED',
      },
    });

    // Get recent activity (last 24 hours)
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const recentActivity = await prisma.activityLog.count({
      where: {
        createdAt: {
          gte: oneDayAgo,
        },
      },
    });

    return NextResponse.json({
      totalSubscribers,
      newLeads,
      articlesPublished,
      recentActivity,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}