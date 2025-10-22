# Articles Structure

Internationalized article storage with optimized images.

## Directory Structure

```
articles/
├── en/                          # English articles
│   └── article-slug/
│       ├── article.md          # Article content
│       └── images/
│           ├── .backup/        # Original images (uncompressed)
│           ├── image1.webp     # Optimized images
│           └── image2.webp
│
└── fr/                          # French articles
    └── article-slug/
        ├── article.md
        └── images/
            ├── .backup/
            ├── image1.webp
            └── image2.webp
```

## Language Codes

Supported languages (from `.spec/blog.spec.json`):

- `en` - English
- `fr` - French
- `es` - Spanish (add as needed)
- `de` - German (add as needed)

## Slug Naming Convention

Article slugs are sanitized versions of titles:

- Lowercase only
- Hyphens instead of spaces
- No special characters
- Example: "Best Node.js Practices" → `best-nodejs-practices`

## Image Management

### Original Images

Place original images in `images/.backup/`:

```bash
articles/en/my-article/images/.backup/screenshot.png
```

### Optimized Images

Run `/blog-optimize-images` to create optimized versions:

```bash
/blog-optimize-images "en/my-article"

# Result:
# - .backup/screenshot.png (original)
# - screenshot.webp (80% quality, optimized)
# - article.md updated with new references
```

### Compression Settings

**Default compression**: 80% quality
**Tool**: ffmpeg (cross-platform: Windows, macOS, Linux)

**Supported formats** (source → target):

- `.png` → `.webp`
- `.jpg` / `.jpeg` → `.webp`
- `.gif` → `.webp` (first frame for static)
- `.bmp` → `.webp`
- `.tiff` → `.webp`

**Install ffmpeg**:

```bash
# macOS
brew install ffmpeg

# Windows (Chocolatey)
choco install ffmpeg

# Linux
sudo apt-get install ffmpeg
```

### Manual Image Workflow

1. **Place original image**:

   ```bash
   cp ~/Downloads/diagram.png articles/en/my-article/images/.backup/
   ```

2. **Reference in article** (use original name first):

   ```markdown
   ![Architecture diagram](images/.backup/diagram.png)
   ```

3. **Run optimization**:

   ```bash
   /blog-optimize-images "en/my-article"
   ```

4. **Result**:
   - Original stays in `.backup/diagram.png`
   - Optimized created: `diagram.webp`
   - Article updated: `![Architecture diagram](images/diagram.webp)`

## Article Structure

### Frontmatter

```yaml
---
title: "Article Title"
description: "Meta description (150-160 chars)"
keywords: ["keyword1", "keyword2"]
author: "Author Name"
date: "YYYY-MM-DD"
language: "en"
slug: "article-slug"
---
```

### Content

- Main heading (H1) from frontmatter title
- Sections with H2/H3 structure
- Images with optimized paths
- Internal links to other articles (same language)

### Image References

**Absolute path** (from article root):

```markdown
![Alt text](/images/diagram.webp)
```

**Relative path** (recommended):

```markdown
![Alt text](images/diagram.webp)
```

## Creating New Article

### With Language

When using commands, specify language:

```bash
# Research (language-agnostic)
/blog-research "Your Topic"

# SEO (language-agnostic)
/blog-seo "Your Topic"

# Marketing/Copywriting (specify language)
/blog-marketing "en/your-topic"
/blog-copywrite "fr/your-topic"
```

### File Placement

Agents will create articles in:

```
articles/{language}/{sanitized-slug}/article.md
```

Example:

```bash
/blog-marketing "en/nodejs-best-practices"

# Creates:
# articles/en/nodejs-best-practices/article.md
# articles/en/nodejs-best-practices/images/
```

## Multi-Language Articles

### Same Topic, Different Languages

```bash
# English version
/blog-copywrite "en/microservices-logging"

# French version (translate manually or rewrite)
/blog-copywrite "fr/microservices-logging"
```

### Cross-Language Linking

In English article:

```markdown
 [Lire en français](/fr/microservices-logging)
```

In French article:

```markdown
 [Read in English](/en/microservices-logging)
```

## Image Optimization Tips

### Before Optimization

- Use descriptive names: `architecture-diagram.png` (not `image1.png`)
- Keep originals high quality (will be backed up)
- Use consistent naming across articles

### After Optimization

- Check `.backup/` contains originals 
- Verify `.webp` files exist 
- Test image loading in article preview 
- Check file sizes reduced (typically 30-70% smaller) 

### Troubleshooting

**Images not found after optimization**:

```bash
# Check paths in article.md
grep "!\[" articles/en/my-article/article.md

# Verify images exist
ls articles/en/my-article/images/
```

**Re-optimize if needed**:

```bash
# Restore from backup
cp articles/en/my-article/images/.backup/* articles/en/my-article/images/

# Re-run optimization
/blog-optimize-images "en/my-article"
```

## Storage Guidelines

### What to Commit

-  `article.md` files
-  `.backup/` original images (optional, see below)
-  Optimized `.webp` images
-  `README.md` (this file)

### What NOT to Commit

-  Temporary files (`.tmp`, `.bak`)
-  OS files (`.DS_Store`, `Thumbs.db`)

### Large Images

For very large originals (>5MB), consider:

1. Storing backups externally (cloud, CDN)
2. Only committing optimized versions
3. Documenting source in `article.md` frontmatter

## Integration with Constitution

Language settings in `.spec/blog.spec.json`:

```json
{
  "blog": {
    "languages": ["en", "fr"]
  }
}
```

This controls which language directories are created and validated.

---

**Need help?** See [`/commands/blog-optimize-images.md`](../commands/blog-optimize-images.md) for image optimization details.
