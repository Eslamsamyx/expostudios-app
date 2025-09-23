import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only ADMIN and SALES roles can access analytics
    if (!['ADMIN', 'SALES'].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30d';

    // Calculate date filter
    const now = new Date();
    const daysMap: Record<string, number> = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '365d': 365,
    };
    const days = daysMap[range] || 30;
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    // Get all leads
    const allLeads = await prisma.lead.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    });

    // Calculate lead metrics
    const leadMetrics = {
      total: allLeads.length,
      new: allLeads.filter(l => l.status === 'NEW').length,
      contacted: allLeads.filter(l => l.status === 'CONTACTED').length,
      qualified: allLeads.filter(l => l.status === 'QUALIFIED').length,
      converted: allLeads.filter(l => l.status === 'CONVERTED').length,
      lost: allLeads.filter(l => l.status === 'LOST').length,
    };

    // Calculate conversion rates
    const conversionRates = {
      newToContacted: leadMetrics.new > 0
        ? Math.round((leadMetrics.contacted / leadMetrics.new) * 100)
        : 0,
      contactedToQualified: leadMetrics.contacted > 0
        ? Math.round((leadMetrics.qualified / leadMetrics.contacted) * 100)
        : 0,
      qualifiedToConverted: leadMetrics.qualified > 0
        ? Math.round((leadMetrics.converted / leadMetrics.qualified) * 100)
        : 0,
      overall: leadMetrics.total > 0
        ? Math.round((leadMetrics.converted / leadMetrics.total) * 100)
        : 0,
    };

    // Get source performance
    const sourceGroups = allLeads.reduce((acc, lead) => {
      const source = lead.source;
      if (!acc[source]) {
        acc[source] = { total: 0, converted: 0 };
      }
      acc[source].total++;
      if (lead.status === 'CONVERTED') {
        acc[source].converted++;
      }
      return acc;
    }, {} as Record<string, { total: number; converted: number }>);

    const sourcePerformance = Object.entries(sourceGroups).map(([source, data]) => ({
      source,
      count: data.total,
      conversionRate: data.total > 0
        ? Math.round((data.converted / data.total) * 100)
        : 0,
    })).sort((a, b) => b.count - a.count);

    // Get monthly trends (simplified - last 6 months)
    const monthlyTrends = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

      const monthLeads = await prisma.lead.count({
        where: {
          createdAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      });

      const monthConversions = await prisma.lead.count({
        where: {
          createdAt: {
            gte: monthStart,
            lte: monthEnd,
          },
          status: 'CONVERTED',
        },
      });

      monthlyTrends.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        leads: monthLeads,
        conversions: monthConversions,
      });
    }

    // Get top performers
    const topPerformers = await prisma.lead.findMany({
      where: {
        score: {
          gte: 70,
        },
      },
      orderBy: {
        score: 'desc',
      },
      take: 5,
      select: {
        id: true,
        email: true,
        score: true,
        dealValue: true,
      },
    });

    return NextResponse.json({
      leadMetrics,
      conversionRates,
      sourcePerformance,
      monthlyTrends,
      topPerformers: topPerformers.map(lead => ({
        leadId: lead.id,
        email: lead.email,
        score: lead.score,
        dealValue: lead.dealValue,
      })),
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}