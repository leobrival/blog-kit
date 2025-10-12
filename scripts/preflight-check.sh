#!/bin/bash

# preflight-check.sh
# Verifies system has required tools for blog generation

echo "🔍 Running pre-flight checks..."
echo ""

EXIT_CODE=0

# Check curl (for WebSearch/WebFetch)
if command -v curl >/dev/null 2>&1; then
  echo "✅ curl: $(curl --version | head -n1)"
else
  echo "❌ curl: NOT FOUND (required for web searches)"
  EXIT_CODE=1
fi

# Check python3 (for JSON parsing)
if command -v python3 >/dev/null 2>&1; then
  echo "✅ python3: $(python3 --version)"
else
  echo "⚠️  python3: NOT FOUND (recommended for JSON validation)"
fi

# Check jq (optional, nice to have)
if command -v jq >/dev/null 2>&1; then
  echo "✅ jq: $(jq --version)"
else
  echo "⚠️  jq: NOT FOUND (optional, will use python3 fallback)"
fi

# Check git (optional, for repo context)
if command -v git >/dev/null 2>&1; then
  echo "✅ git: $(git --version | head -n1)"
else
  echo "⚠️  git: NOT FOUND (optional)"
fi

# Check directories
echo ""
echo "📁 Checking directories..."

if [ -d ".specify" ]; then
  echo "✅ .specify/: exists"
else
  echo "⚠️  .specify/: creating..."
  mkdir -p .specify/research .specify/seo
fi

if [ -d "articles" ]; then
  echo "✅ articles/: exists"
else
  echo "⚠️  articles/: creating..."
  mkdir -p articles
fi

# Check constitution (optional)
echo ""
if [ -f ".spec/blog.spec.json" ]; then
  echo "✅ Blog constitution found"
  echo "   Agents will apply brand rules automatically"
else
  echo "ℹ️  No blog constitution found"
  echo "   Run /blog-setup to create one (optional)"
fi

echo ""
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ Pre-flight checks passed!"
else
  echo "❌ Pre-flight checks failed"
  echo "   Please install missing required tools"
fi

exit $EXIT_CODE
