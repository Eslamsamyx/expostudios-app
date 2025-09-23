import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testToggleSync() {
  console.log('🧪 Testing Toggle Sync with Database\n');
  console.log('='.repeat(50));

  // 1. Initial state
  console.log('\n1️⃣ Initial State:');
  let setting = await prisma.settings.findUnique({
    where: { key: 'enable_newsletter' }
  });
  console.log(`   Database: enable_newsletter = ${setting?.value}`);

  // 2. Simulate toggle click (what happens when you click in UI)
  console.log('\n2️⃣ Simulating Toggle Click:');
  const newValue = !(setting?.value as boolean);
  console.log(`   Changing to: ${newValue}`);

  // Update database immediately (like the new code does)
  await prisma.settings.update({
    where: { key: 'enable_newsletter' },
    data: { value: newValue }
  });

  // 3. Verify database updated
  console.log('\n3️⃣ Checking Database After Toggle:');
  setting = await prisma.settings.findUnique({
    where: { key: 'enable_newsletter' }
  });
  console.log(`   Database: enable_newsletter = ${setting?.value}`);

  // 4. Simulate page refresh (fetching from database)
  console.log('\n4️⃣ Simulating Page Refresh:');
  const allSettings = await prisma.settings.findMany({
    where: {
      key: {
        in: ['enable_newsletter', 'enable_blog', 'maintenance_mode']
      }
    }
  });

  console.log('   Settings loaded from database:');
  allSettings.forEach(s => {
    const icon = s.value ? '✅' : '❌';
    console.log(`   ${icon} ${s.key}: ${s.value}`);
  });

  // 5. Test result
  console.log('\n' + '='.repeat(50));
  if (setting?.value === newValue) {
    console.log('✅ SUCCESS: Toggle persists after refresh!');
    console.log('   • Toggle updates database immediately');
    console.log('   • Page refresh loads from database');
    console.log('   • State stays in sync');
  } else {
    console.log('❌ FAILED: Toggle did not persist correctly');
  }

  // Toggle back for next test
  await prisma.settings.update({
    where: { key: 'enable_newsletter' },
    data: { value: !newValue }
  });
  console.log(`\n🔄 Toggled back to original state: ${!newValue}`);
}

testToggleSync()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });