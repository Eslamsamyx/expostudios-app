import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: { email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate a reset token (in production, this would be saved and used for verification)
    const resetToken = randomBytes(32).toString('hex');

    // In production, you would:
    // 1. Save the reset token to database with expiry
    // 2. Send an actual email with the reset link
    // 3. Handle the reset flow

    // Log the activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'PASSWORD_RESET',
        entity: 'User',
        entityId: params.id,
        details: `Password reset email sent to ${user.email}`,
      },
    });

    // For demo purposes, we'll just return success
    return NextResponse.json({
      success: true,
      message: `Password reset email sent to ${user.email}`,
      // In development, you might want to see the token
      ...(process.env.NODE_ENV === 'development' && { resetToken }),
    });
  } catch (error) {
    console.error("Error sending password reset:", error);
    return NextResponse.json(
      { error: "Failed to send password reset email" },
      { status: 500 }
    );
  }
}