#!/bin/bash

echo "Fixing build errors..."

# Fix TypeScript any type errors by replacing with proper types
sed -i '' 's/: any/: unknown/g' ./app/api/dashboard/admin/articles/\[id\]/route.ts
sed -i '' 's/: any/: unknown/g' ./app/api/dashboard/admin/health/route.ts
sed -i '' 's/: any/: unknown/g' ./app/api/dashboard/admin/users/\[id\]/route.ts
sed -i '' 's/: any/: unknown/g' ./app/api/dashboard/writer/articles/\[id\]/route.ts
sed -i '' 's/: any/: unknown/g' ./app/api/public/settings/route.ts
sed -i '' 's/: any/: unknown/g' ./app/dashboard/admin/activity/page.tsx
sed -i '' 's/: any/: unknown/g' ./app/dashboard/admin/articles/\[id\]/edit/page.tsx
sed -i '' 's/: any/: Record<string, unknown>/g' ./app/dashboard/admin/settings/page.tsx
sed -i '' 's/: any/: unknown/g' ./app/dashboard/admin/users/\[id\]/page.tsx
sed -i '' 's/: any/: unknown/g' ./app/dashboard/writer/articles/\[id\]/edit/page.tsx
sed -i '' 's/: any/: unknown/g' ./app/dashboard/writer/media/page.tsx
sed -i '' 's/: any/: unknown/g' ./app/dashboard/writer/new/page.tsx
sed -i '' 's/: any/: unknown/g' ./lib/settings.ts

echo "Fixed TypeScript any types"

# Fix React unescaped entities
sed -i '' "s/what's/what\&apos;s/g" ./app/dashboard/page.tsx
sed -i '' "s/We're/We\&apos;re/g" ./app/maintenance/page.tsx
sed -i '' "s/we'll/we\&apos;ll/g" ./app/maintenance/page.tsx
sed -i '' "s/couldn't/couldn\&apos;t/g" ./app/not-found.tsx
sed -i '' 's/"Innovative/\&ldquo;Innovative/g' ./components/ComingSoon.tsx
sed -i '' 's/Solutions"/Solutions\&rdquo;/g' ./components/ComingSoon.tsx
sed -i '' "s/Don't/Don\&apos;t/g" ./components/ComingSoon.tsx
sed -i '' "s/what's/what\&apos;s/g" ./components/ComingSoon.tsx

echo "Fixed React unescaped entities"

echo "Build errors fixed!"