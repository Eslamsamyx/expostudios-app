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

    // Only ADMIN and SALES roles can access leads
    if (!['ADMIN', 'SALES'].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const leads = await prisma.lead.findMany({
      include: {
        newsletter: {
          select: {
            name: true,
          },
        },
        interactions: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format the response
    const formattedLeads = leads.map(lead => ({
      id: lead.id,
      email: lead.email,
      name: lead.newsletter?.name || null,
      phone: lead.phone,
      company: lead.company,
      source: lead.source,
      status: lead.status,
      score: lead.score,
      notes: lead.notes,
      createdAt: lead.createdAt,
      lastContactAt: lead.interactions[0]?.createdAt || null,
    }));

    return NextResponse.json(formattedLeads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}