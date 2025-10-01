import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await prisma.settings.findMany({
      orderBy: {
        key: 'asc',
      },
    });

    // If no settings exist, create default settings
    if (settings.length === 0) {
      const defaultSettings = [
        {
          key: 'site_name',
          value: 'ExpoStudios',
          description: 'The name of your website',
        },
        {
          key: 'site_description',
          value: 'Creative Agency & Production House',
          description: 'Main description of your website',
        },
        {
          key: 'contact_email',
          value: 'contact@expostudios.com',
          description: 'Primary contact email address',
        },
        {
          key: 'social_links',
          value: {
            linkedin: '',
            instagram: '',
            behance: '',
            twitter: '',
          },
          description: 'Social media profile links',
        },
        {
          key: 'enable_newsletter',
          value: true,
          description: 'Enable newsletter subscription',
        },
        {
          key: 'enable_blog',
          value: true,
          description: 'Enable blog functionality',
        },
        {
          key: 'maintenance_mode',
          value: false,
          description: 'Enable maintenance mode',
        },
      ];

      await prisma.settings.createMany({
        data: defaultSettings,
      });

      const newSettings = await prisma.settings.findMany({
        orderBy: {
          key: 'asc',
        },
      });

      return NextResponse.json(newSettings);
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const updatedSettings = [];

    // Update each setting
    for (const [key, value] of Object.entries(body)) {
      const setting = await prisma.settings.upsert({
        where: { key },
        update: { value: value as Prisma.InputJsonValue },
        create: { key, value: value as Prisma.InputJsonValue },
      });
      updatedSettings.push(setting);
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'UPDATE',
        entity: 'Settings',
        entityId: 'system',
        details: 'Updated system settings',
      },
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}