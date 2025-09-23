import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Public endpoint to check settings (no auth required)
export async function GET() {
  try {
    const settings = await prisma.settings.findMany({
      where: {
        key: {
          in: ['maintenance_mode', 'enable_newsletter', 'enable_blog', 'site_name', 'site_description']
        }
      }
    });

    // Convert to object
    const settingsObj: Record<string, any> = {};
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });

    return NextResponse.json(settingsObj);
  } catch (error) {
    console.error("Error fetching public settings:", error);
    // Return defaults on error
    return NextResponse.json({
      maintenance_mode: false,
      enable_newsletter: true,
      enable_blog: true,
      site_name: 'ExpoStudios',
      site_description: 'Creative Agency & Production House'
    });
  }
}