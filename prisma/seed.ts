import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@ExpoStudios2024', 12);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@expostudios.com' },
    update: {},
    create: {
      email: 'admin@expostudios.com',
      password: hashedPassword,
      name: 'Admin User',
      role: Role.ADMIN,
      isActive: true,
      emailVerified: true,
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create writer user
  const writerPassword = await bcrypt.hash('Writer@ExpoStudios2024', 12);

  const writerUser = await prisma.user.upsert({
    where: { email: 'writer@expostudios.com' },
    update: {},
    create: {
      email: 'writer@expostudios.com',
      password: writerPassword,
      name: 'Content Writer',
      role: Role.WRITER,
      isActive: true,
      emailVerified: true,
    },
  });

  console.log('✅ Writer user created:', writerUser.email);

  // Create sales user
  const salesPassword = await bcrypt.hash('Sales@ExpoStudios2024', 12);

  const salesUser = await prisma.user.upsert({
    where: { email: 'sales@expostudios.com' },
    update: {},
    create: {
      email: 'sales@expostudios.com',
      password: salesPassword,
      name: 'Sales Team',
      role: Role.SALES,
      isActive: true,
      emailVerified: true,
    },
  });

  console.log('✅ Sales user created:', salesUser.email);

  // Create some sample newsletter subscribers
  const sampleEmails = [
    'john.doe@example.com',
    'jane.smith@example.com',
    'mike.wilson@example.com',
    'sarah.jones@example.com',
    'david.brown@example.com',
  ];

  for (const email of sampleEmails) {
    const subscriber = await prisma.newsletter.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: (email.split('@')[0] || email).replace('.', ' ').split(' ').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        source: 'COMING_SOON',
        tags: ['early-access', 'interested'],
      },
    });

    // Also create lead record
    await prisma.lead.upsert({
      where: { email },
      update: {},
      create: {
        email,
        newsletterId: subscriber.id,
        source: 'COMING_SOON',
        status: 'NEW',
        score: Math.floor(Math.random() * 100),
      },
    });
  }

  console.log('✅ Sample newsletter subscribers created');

  // Create a sample article
  const article = await prisma.article.create({
    data: {
      slug: 'welcome-to-expostudios',
      title: 'Welcome to ExpoStudios',
      excerpt: 'Discover how we craft experiences people can feel and outcomes you can measure.',
      content: `
        <h2>Welcome to ExpoStudios</h2>
        <p>We are thrilled to announce the launch of ExpoStudios, where we blend space, story, and technology to turn your goals into moments your audience won't forget.</p>

        <h3>Our Services</h3>
        <ul>
          <li><strong>Consult</strong> - Strategy & Concept</li>
          <li><strong>Create</strong> - 3D Design</li>
          <li><strong>Build</strong> - Development</li>
          <li><strong>Amplify</strong> - Marketing</li>
        </ul>

        <h3>Our Promise</h3>
        <p>We craft experiences people can feel and outcomes you can measure. From insight to impact, we provide a clear path to unforgettable experiences.</p>
      `,
      status: 'PUBLISHED',
      publishedAt: new Date(),
      authorId: writerUser.id,
      category: 'News',
      tags: ['announcement', 'welcome', 'company'],
      metaTitle: 'Welcome to ExpoStudios - Crafting Digital Experiences',
      metaDescription: 'Discover how ExpoStudios blends space, story, and technology to create unforgettable experiences.',
      keywords: ['ExpoStudios', 'digital experiences', 'exhibitions', 'pavilions'],
    },
  });

  console.log('✅ Sample article created:', article.slug);

  // Create initial settings
  const settings = [
    {
      key: 'site_name',
      value: 'ExpoStudios',
      description: 'The name of the website',
    },
    {
      key: 'site_description',
      value: 'We craft experiences people can feel and outcomes you can measure',
      description: 'The main description of the website',
    },
    {
      key: 'contact_email',
      value: 'hello@expostudios.com',
      description: 'Main contact email address',
    },
    {
      key: 'social_links',
      value: {
        linkedin: 'https://linkedin.com/company/expostudios',
        instagram: 'https://instagram.com/expostudios',
        behance: 'https://behance.net/expostudios',
        twitter: 'https://x.com/expostudios',
      },
      description: 'Social media links',
    },
  ];

  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('✅ Initial settings created');
  console.log('\n📝 Login credentials:');
  console.log('Admin: admin@expostudios.com / Admin@ExpoStudios2024');
  console.log('Writer: writer@expostudios.com / Writer@ExpoStudios2024');
  console.log('Sales: sales@expostudios.com / Sales@ExpoStudios2024');
  console.log('\n✨ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });