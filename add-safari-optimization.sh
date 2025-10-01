#!/bin/bash

# Add Safari optimization import and apply to all motion.div elements

FILES=$(find components -name "*.tsx" -type f -exec grep -l "from 'framer-motion'" {} \;)

for file in $FILES; do
  echo "Processing $file..."

  # Check if already has safari optimization
  if grep -q "safari-optimization" "$file"; then
    echo "  ✓ Already has Safari optimization"
    continue
  fi

  # Check if file has motion.div
  if ! grep -q "motion\.div" "$file"; then
    echo "  ✗ No motion.div found, skipping"
    continue
  fi

  # Add import after framer-motion import
  if grep -q "from 'framer-motion'" "$file"; then
    sed -i '' "/from 'framer-motion'/a\\
import { safariOptimization } from '@/lib/utils/safari-optimization';
" "$file"
    echo "  ✓ Added Safari optimization import"
  fi
done

echo "Done! Safari optimization imports added to all motion components."
echo "Note: You'll need to manually add style={safariOptimization} to motion.div elements with animations."
