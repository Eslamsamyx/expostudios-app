import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only ADMIN and SALES roles can update leads
    if (!['ADMIN', 'SALES'].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { status, notes, score } = body;

    const updatedLead = await prisma.lead.update({
      where: {
        id: params.id,
      },
      data: {
        ...(status && { status }),
        ...(notes && { notes }),
        ...(score !== undefined && { score }),
        lastContactedAt: new Date(),
      },
    });

    // Log the activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'UPDATE',
        entity: 'Lead',
        entityId: params.id,
        details: `Updated lead status to ${status}`,
      },
    });

    // Create an interaction record if status changed
    if (status) {
      await prisma.interaction.create({
        data: {
          leadId: params.id,
          type: 'NOTE',
          description: `Status changed to ${status} by ${session.user.email}`,
          createdBy: session.user.id,
        },
      });
    }

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}