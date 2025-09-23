import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedSettings() {
  console.log('🌱 Seeding default settings...');

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
        linkedin: 'https://linkedin.com/company/expostudios',
        instagram: 'https://instagram.com/expostudios',
        behance: 'https://behance.net/expostudios',
        twitter: 'https://x.com/expostudios',
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

  for (const setting of defaultSettings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: {
        // Don't update if already exists - preserve user changes
      },
      create: {
        key: setting.key,
        value: setting.value,
        description: setting.description,
      },
    });
    console.log(`✅ Setting '${setting.key}' ensured`);
  }

  console.log('✨ Settings seeding completed!');
}

seedSettings()
  .catch((e) => {
    console.error('Error seeding settings:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });