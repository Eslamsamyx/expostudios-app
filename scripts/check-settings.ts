import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkSettings() {
  console.log('📊 Current Settings in Database:\n');

  const settings = await prisma.settings.findMany({
    orderBy: { key: 'asc' }
  });

  if (settings.length === 0) {
    console.log('❌ No settings found in database');
    return;
  }

  settings.forEach(setting => {
    console.log(`📌 ${setting.key}:`);
    console.log(`   Value: ${JSON.stringify(setting.value, null, 2)}`);
    console.log(`   Description: ${setting.description || 'No description'}`);
    console.log(`   Last Updated: ${setting.updatedAt.toLocaleString()}`);
    console.log('');
  });

  console.log(`\nTotal settings: ${settings.length}`);
}

checkSettings()
  .catch((e) => {
    console.error('Error checking settings:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });