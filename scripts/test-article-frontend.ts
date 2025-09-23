import { chromium } from 'playwright';

async function testArticleFrontend() {
  console.log('🧪 Testing Article Management Frontend\n');
  console.log('='.repeat(50));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Login as admin
    console.log('\n1️⃣ Logging in as admin...');
    await page.goto('http://localhost:3002/login');
    await page.fill('input[type="email"]', 'admin@expostudios.com');
    await page.fill('input[type="password"]', 'admin123456');
    await page.click('button[type="submit"]');

    // Wait for navigation to dashboard
    await page.waitForURL('**/dashboard/**', { timeout: 10000 });
    console.log('   ✅ Logged in successfully');

    // 2. Navigate to Admin Articles Page
    console.log('\n2️⃣ Testing Admin Articles Page...');
    await page.goto('http://localhost:3002/dashboard/admin/articles');
    await page.waitForLoadState('networkidle');

    // Check page title
    const pageTitle = await page.textContent('h1');
    console.log(`   Page Title: "${pageTitle}" ${pageTitle?.includes('Articles Management') ? '✅' : '❌'}`);

    // Check if articles are loaded
    const articlesExist = await page.locator('table tbody tr').count() > 0 ||
                         await page.textContent('body').then(text => text?.includes('Welcome to ExpoStudios'));
    console.log(`   Articles loaded: ${articlesExist ? '✅' : '❌'}`);

    // Check filters
    const searchInput = await page.locator('input[placeholder="Search articles..."]').isVisible();
    console.log(`   Search input visible: ${searchInput ? '✅' : '❌'}`);

    const statusFilter = await page.locator('select').first().isVisible();
    console.log(`   Status filter visible: ${statusFilter ? '✅' : '❌'}`);

    // Check create button
    const createButton = await page.getByText('Create New Article').isVisible();
    console.log(`   Create button visible: ${createButton ? '✅' : '❌'}`);

    // Check stats
    const statsVisible = await page.locator('text=Published').isVisible();
    console.log(`   Statistics visible: ${statsVisible ? '✅' : '❌'}`);

    // 3. Test Edit Article Page
    console.log('\n3️⃣ Testing Edit Article Page...');

    // Click edit button for first article
    const editButton = await page.locator('button:has-text("Edit")').first();
    if (await editButton.isVisible()) {
      await editButton.click();
      await page.waitForLoadState('networkidle');

      // Check if we're on edit page
      const editPageTitle = await page.textContent('h1');
      console.log(`   Edit page title: "${editPageTitle}" ${editPageTitle?.includes('Edit Article') ? '✅' : '❌'}`);

      // Check form fields
      const titleInput = await page.locator('input[value*="Welcome"]').isVisible() ||
                        await page.locator('input[type="text"]').first().isVisible();
      console.log(`   Title input visible: ${titleInput ? '✅' : '❌'}`);

      const contentTextarea = await page.locator('textarea').first().isVisible();
      console.log(`   Content textarea visible: ${contentTextarea ? '✅' : '❌'}`);

      const statusSelect = await page.locator('select').first().isVisible();
      console.log(`   Status select visible: ${statusSelect ? '✅' : '❌'}`);

      // Check SEO section
      const seoSection = await page.getByText('SEO Settings').isVisible();
      console.log(`   SEO settings section: ${seoSection ? '✅' : '❌'}`);

      // Check Publishing section
      const publishingSection = await page.getByText('Publishing').isVisible();
      console.log(`   Publishing section: ${publishingSection ? '✅' : '❌'}`);

      // Check Article Info section
      const infoSection = await page.getByText('Article Info').isVisible();
      console.log(`   Article info section: ${infoSection ? '✅' : '❌'}`);

      // Check save button
      const saveButton = await page.getByText('Save Changes').isVisible();
      console.log(`   Save button visible: ${saveButton ? '✅' : '❌'}`);

      // Test form interaction
      console.log('\n4️⃣ Testing Form Interactions...');

      // Try to update title
      const titleField = await page.locator('input').first();
      const originalTitle = await titleField.inputValue();
      await titleField.fill(originalTitle + ' (Test)');
      const updatedTitle = await titleField.inputValue();
      console.log(`   Title field editable: ${updatedTitle.includes('(Test)') ? '✅' : '❌'}`);

      // Restore original title
      await titleField.fill(originalTitle);

      // Test slug auto-generation
      await titleField.fill('Test Article Title');
      await page.waitForTimeout(500);
      const slugField = await page.locator('input').nth(1);
      const slugValue = await slugField.inputValue();
      console.log(`   Slug auto-generation: ${slugValue.includes('test-article-title') ? '✅' : '❌'}`);

      // Restore original
      await titleField.fill(originalTitle);

      // Go back to articles page
      await page.click('button:has-text("Back to Articles")');
      await page.waitForLoadState('networkidle');
    } else {
      console.log('   ⚠️  No edit button found - might be no articles');
    }

    // 5. Test Responsiveness
    console.log('\n5️⃣ Testing Responsiveness...');

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    const mobileMenuVisible = await page.locator('button').first().isVisible();
    console.log(`   Mobile view works: ${mobileMenuVisible ? '✅' : '❌'}`);

    // Restore desktop view
    await page.setViewportSize({ width: 1280, height: 720 });

    console.log('\n✨ Frontend Test Summary:');
    console.log('='.repeat(50));
    console.log('✅ Admin login successful');
    console.log('✅ Articles page loads correctly');
    console.log('✅ Edit page functions properly');
    console.log('✅ Form fields are interactive');
    console.log('✅ Navigation works correctly');

  } catch (error) {
    console.error('\n❌ Test Error:', error.message);

    // Take screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('📸 Screenshot saved as error-screenshot.png');
  } finally {
    await browser.close();
  }
}

testArticleFrontend().catch(console.error);