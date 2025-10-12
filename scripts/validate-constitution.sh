#!/bin/bash

# validate-constitution.sh
# Validates .spec/blog.spec.json structure

set -e

CONSTITUTION=".spec/blog.spec.json"

echo "🔍 Validating blog constitution..."

# Check if file exists
if [ ! -f "$CONSTITUTION" ]; then
  echo "❌ Constitution file not found: $CONSTITUTION"
  echo "   Run /blog-setup to create it"
  exit 1
fi

# Validate JSON syntax
if command -v python3 >/dev/null 2>&1; then
  if ! python3 -m json.tool "$CONSTITUTION" > /dev/null 2>&1; then
    echo "❌ Invalid JSON syntax in $CONSTITUTION"
    exit 1
  fi
else
  echo "⚠️  python3 not found, skipping JSON syntax validation"
fi

# Check required fields (basic validation)
required_fields=("blog" "blog.name" "blog.context" "blog.tone")

for field in "${required_fields[@]}"; do
  if command -v python3 >/dev/null 2>&1; then
    field_check=$(python3 -c "
import json, sys
try:
    data = json.load(open('$CONSTITUTION'))
    keys = '$field'.split('.')
    value = data
    for key in keys:
        value = value.get(key)
        if value is None:
            sys.exit(1)
    print('ok')
except:
    sys.exit(1)
" 2>/dev/null || echo "missing")

    if [ "$field_check" = "missing" ]; then
      echo "❌ Missing required field: $field"
      exit 1
    fi
  fi
done

echo "✅ Constitution valid!"
exit 0
