import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function toggleMaintenanceMode() {
  // Get current status
  const current = await prisma.settings.findUnique({
    where: { key: 'maintenance_mode' }
  });

  const currentValue = current?.value as boolean;
  const newValue = !currentValue;

  // Toggle the value
  await prisma.settings.update({
    where: { key: 'maintenance_mode' },
    data: { value: newValue }
  });

  console.log(`🔧 Maintenance Mode: ${currentValue ? 'ON' : 'OFF'} → ${newValue ? 'ON' : 'OFF'}`);
  console.log(newValue
    ? '⚠️  Site is now in MAINTENANCE MODE (visitors see maintenance page)'
    : '✅ Site is now LIVE (visitors can access normally)'
  );
}

toggleMaintenanceMode()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });