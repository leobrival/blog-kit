# Commands

Slash commands for blog article generation.

## Available Commands

### Setup & Generation

- **`/blog-setup`** - Interactive setup wizard for blog constitution
- **`/blog-generate`** - Complete article workflow (research → SEO → marketing)

### Individual Phases

- **`/blog-research`** - Research phase only
- **`/blog-seo`** - SEO optimization phase only
- **`/blog-marketing`** - Content creation phase only
- **`/blog-copywrite`** - Spec-driven copywriting (brand voice focus)

### Quality & Validation

- **`/blog-optimize`** - Quality validation (frontmatter, markdown, SEO)
- **`/blog-optimize-images`** - Image optimization (compression, WebP conversion)

### Translation & i18n

- **`/blog-translate`** - i18n structure validation and article translation

## Quick Reference

| Command | Input | Output | Time | Use When |
|---------|-------|--------|------|----------|
| `/blog-setup` | - | `.spec/blog.spec.json` | 2 min | First time setup |
| `/blog-generate` | Topic | Full article | 30-45 min | New article, complete workflow |
| `/blog-research` | Topic | Research report | 15-20 min | Need research only |
| `/blog-seo` | Topic | SEO brief | 5-10 min | Need SEO structure |
| `/blog-marketing` | Topic | Article (conversion-focused) | 10-15 min | Marketing content |
| `/blog-copywrite` | Topic | Article (spec-driven) | 20-40 min | Brand-perfect copy |
| `/blog-optimize` | Topic | Validation report | 10-15 min | Quality check |
| `/blog-optimize-images` | lang/slug | Optimized images (WebP) | 10-20 min | Image compression |
| `/blog-translate` | - or lang/slug + target | Coverage report or translation | 2-20 min | i18n validation or translation |

## Workflows

### Full Article Generation (Marketing Focus)
```bash
/blog-setup                    # One-time
/blog-generate "Your Topic"    # Complete workflow
```

### Spec-Driven Article (Brand Focus)
```bash
/blog-setup                    # One-time
/blog-research "Your Topic"
/blog-seo "Your Topic"
/blog-copywrite "Your Topic"   # Use copywriter instead of marketing
/blog-optimize "Your Topic"    # Validate
```

### Rewrite Existing Content
```bash
/blog-copywrite "existing-topic"  # Rewrite for brand compliance
/blog-optimize "existing-topic"   # Validate quality
```

### Article with Images
```bash
/blog-marketing "en/my-topic"            # Create article
# Add images to articles/en/my-topic/images/.backup/
/blog-optimize-images "en/my-topic"      # Optimize images (WebP)
/blog-optimize "en/my-topic"             # Validate quality
```

### Multi-Language Article
```bash
/blog-copywrite "en/nodejs-logging"      # Create English version
/blog-optimize "en/nodejs-logging"       # Validate
/blog-translate                          # Check coverage (shows missing)
/blog-translate "en/nodejs-logging" "fr" # Translate to French
/blog-translate "en/nodejs-logging" "es" # Translate to Spanish
/blog-translate                          # Verify 100% coverage
```

Each command file contains detailed instructions for Claude Code agents.
