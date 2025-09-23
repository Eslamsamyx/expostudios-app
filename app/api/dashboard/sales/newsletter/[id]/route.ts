import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only ADMIN and SALES roles can update newsletter subscribers
    if (!['ADMIN', 'SALES'].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { isSubscribed } = body;

    const updatedSubscriber = await prisma.newsletter.update({
      where: {
        id: params.id,
      },
      data: {
        isSubscribed,
        ...(isSubscribed === false && { unsubscribedAt: new Date() }),
        ...(isSubscribed === true && { unsubscribedAt: null, subscribedAt: new Date() }),
      },
    });

    // Log the activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'UPDATE',
        entity: 'Newsletter',
        entityId: params.id,
        details: `Updated subscription status to ${isSubscribed ? 'subscribed' : 'unsubscribed'}`,
      },
    });

    return NextResponse.json(updatedSubscriber);
  } catch (error) {
    console.error("Error updating subscriber:", error);
    return NextResponse.json(
      { error: "Failed to update subscriber" },
      { status: 500 }
    );
  }
}