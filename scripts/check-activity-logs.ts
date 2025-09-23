import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkActivityLogs() {
  console.log('📊 Checking Activity Logs\n');

  const logs = await prisma.activityLog.findMany({
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });

  console.log(`Total logs found: ${await prisma.activityLog.count()}\n`);

  if (logs.length === 0) {
    console.log('No activity logs found. Creating some test logs...\n');

    // Create some test logs
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (adminUser) {
      await prisma.activityLog.createMany({
        data: [
          {
            userId: adminUser.id,
            action: 'LOGIN',
            entity: 'Session',
            details: { message: 'Admin user logged in' },
          },
          {
            userId: adminUser.id,
            action: 'UPDATE',
            entity: 'Settings',
            entityId: 'system',
            details: { message: 'Updated system settings' },
          },
          {
            userId: adminUser.id,
            action: 'CREATE',
            entity: 'User',
            details: { message: 'Created new user account' },
          },
        ],
      });

      console.log('✅ Created 3 test activity logs\n');
    }
  } else {
    console.log('Recent Activity Logs:');
    console.log('='.repeat(50));

    logs.forEach(log => {
      console.log(`\n📌 ${log.action} - ${log.entity}`);
      console.log(`   User: ${log.user?.email || 'System'}`);
      console.log(`   Details: ${JSON.stringify(log.details)}`);
      console.log(`   Time: ${log.createdAt.toLocaleString()}`);
    });
  }
}

checkActivityLogs()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });