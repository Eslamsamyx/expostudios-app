import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testToggle() {
  console.log('🧪 Testing toggle persistence...\n');

  // 1. Check current state
  const beforeSetting = await prisma.settings.findUnique({
    where: { key: 'enable_newsletter' }
  });

  console.log('📌 Before: enable_newsletter =', beforeSetting?.value);

  // 2. Toggle the value
  const newValue = !(beforeSetting?.value as boolean);

  await prisma.settings.update({
    where: { key: 'enable_newsletter' },
    data: { value: newValue }
  });

  console.log('🔄 Toggled to:', newValue);

  // 3. Verify it persisted
  const afterSetting = await prisma.settings.findUnique({
    where: { key: 'enable_newsletter' }
  });

  console.log('📌 After: enable_newsletter =', afterSetting?.value);

  if (afterSetting?.value === newValue) {
    console.log('\n✅ SUCCESS: Toggle persisted correctly!');
  } else {
    console.log('\n❌ FAILED: Toggle did not persist!');
  }

  // 4. Show all current toggle states
  console.log('\n📊 All Toggle States:');
  const toggleSettings = await prisma.settings.findMany({
    where: {
      key: {
        in: ['enable_newsletter', 'enable_blog', 'maintenance_mode']
      }
    }
  });

  toggleSettings.forEach(s => {
    console.log(`  ${s.key}: ${s.value}`);
  });
}

testToggle()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });