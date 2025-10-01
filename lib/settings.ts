import { prisma } from "@/lib/prisma";

// Cache settings for performance
let settingsCache: Record<string, unknown> = {};
let cacheTime = 0;
const CACHE_DURATION = 60000; // 1 minute cache

export async function getSettings(): Promise<Record<string, unknown>> {
  const now = Date.now();

  // Return cached settings if still valid
  if (settingsCache && (now - cacheTime) < CACHE_DURATION) {
    return settingsCache;
  }

  try {
    const settings = await prisma.settings.findMany();

    // Convert array to object
    const settingsObj: Record<string, unknown> = {};
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });

    // Update cache
    settingsCache = settingsObj;
    cacheTime = now;

    return settingsObj;
  } catch (error) {
    console.error('Error fetching settings:', error);
    // Return default settings on error
    return {
      site_name: 'ExpoStudios',
      site_description: 'Creative Agency & Production House',
      contact_email: 'contact@expostudios.com',
      social_links: {
        linkedin: '',
        instagram: '',
        behance: '',
        twitter: '',
      },
      enable_newsletter: true,
      enable_blog: true,
      maintenance_mode: false,
    };
  }
}

export async function getSetting(key: string, defaultValue?: unknown) {
  const settings = await getSettings();
  return settings[key] ?? defaultValue;
}

// Check if a feature is enabled
export async function isFeatureEnabled(feature: 'newsletter' | 'blog' | 'maintenance'): Promise<boolean> {
  const settings = await getSettings();

  switch(feature) {
    case 'newsletter':
      return typeof settings.enable_newsletter === 'boolean' ? settings.enable_newsletter : true;
    case 'blog':
      return typeof settings.enable_blog === 'boolean' ? settings.enable_blog : true;
    case 'maintenance':
      return typeof settings.maintenance_mode === 'boolean' ? settings.maintenance_mode : false;
    default:
      return false;
  }
}

// Clear cache when settings are updated
export function clearSettingsCache() {
  settingsCache = {};
  cacheTime = 0;
}