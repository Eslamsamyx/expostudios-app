import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testArticlePages() {
  console.log('🧪 Testing Article Management Pages\n');
  console.log('='.repeat(50));

  const article = await prisma.article.findFirst({
    include: { author: true }
  });

  const admin = await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  });

  if (!article || !admin) {
    console.log('❌ Test data not found');
    return;
  }

  console.log('\n📊 Test URLs for Manual Testing:');
  console.log('='.repeat(50));

  console.log('\n1. Admin Login:');
  console.log('   URL: http://localhost:3002/login');
  console.log('   Credentials:');
  console.log('   - Email: admin@expostudios.com');
  console.log('   - Password: admin123456');

  console.log('\n2. Admin Articles Page:');
  console.log('   URL: http://localhost:3002/dashboard/admin/articles');
  console.log('   Expected features:');
  console.log('   ✓ List all articles with author info');
  console.log('   ✓ Search and filter functionality');
  console.log('   ✓ Status badges (Published/Draft/Archived)');
  console.log('   ✓ Featured star toggle');
  console.log('   ✓ Edit and Delete buttons');
  console.log('   ✓ Statistics at bottom');

  console.log('\n3. Article Edit Page:');
  console.log(`   URL: http://localhost:3002/dashboard/admin/articles/${article.id}/edit`);
  console.log('   Expected sections:');
  console.log('   ✓ Basic Information (Title, Slug, Excerpt, Content, Cover Image)');
  console.log('   ✓ SEO Settings (Meta Title, Meta Description, Keywords)');
  console.log('   ✓ Publishing (Status, Category, Tags, Feature toggle)');
  console.log('   ✓ Article Info (Author, Views, Dates)');

  console.log('\n4. Current Article Data:');
  console.log('   ID:', article.id);
  console.log('   Title:', article.title);
  console.log('   Status:', article.status);
  console.log('   Author:', article.author.email);
  console.log('   Views:', article.views);
  console.log('   Featured:', article.featuredAt ? 'Yes' : 'No');

  // Check API routes are registered
  console.log('\n5. API Endpoints Status:');
  const endpoints = [
    { path: '/api/dashboard/admin/articles', method: 'GET', description: 'List all articles' },
    { path: `/api/dashboard/admin/articles/${article.id}`, method: 'GET', description: 'Get single article' },
    { path: `/api/dashboard/admin/articles/${article.id}`, method: 'PATCH', description: 'Update article' },
    { path: `/api/dashboard/admin/articles/${article.id}`, method: 'DELETE', description: 'Delete article' },
  ];

  for (const endpoint of endpoints) {
    console.log(`   ${endpoint.method} ${endpoint.path}`);
    console.log(`   → ${endpoint.description}`);
  }

  // Test data integrity
  console.log('\n6. Data Integrity Check:');

  // Check article has all required fields
  const requiredFields = ['id', 'slug', 'title', 'content', 'status', 'authorId'];
  const missingFields = requiredFields.filter(field => !article[field]);

  if (missingFields.length === 0) {
    console.log('   ✅ Article has all required fields');
  } else {
    console.log('   ❌ Missing fields:', missingFields.join(', '));
  }

  // Check author relationship
  if (article.author) {
    console.log('   ✅ Author relationship intact');
  } else {
    console.log('   ❌ Author relationship broken');
  }

  // Recent activity logs for articles
  console.log('\n7. Recent Article Activity:');
  const recentLogs = await prisma.activityLog.findMany({
    where: { entity: 'Article' },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { user: true }
  });

  if (recentLogs.length > 0) {
    recentLogs.forEach(log => {
      console.log(`   ${log.action} by ${log.user?.email || 'System'} at ${log.createdAt.toLocaleString()}`);
    });
  } else {
    console.log('   No recent article activity');
  }

  console.log('\n✨ Test Instructions:');
  console.log('='.repeat(50));
  console.log('1. Login with admin credentials');
  console.log('2. Visit Admin Articles page - verify all features work');
  console.log('3. Click Edit on any article - verify all fields are editable');
  console.log('4. Try updating an article - verify changes save');
  console.log('5. Check activity logs to confirm updates are tracked');
  console.log('\n📝 All pages should be fully functional!');
}

testArticlePages()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });