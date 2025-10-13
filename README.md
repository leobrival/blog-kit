# Blog Kit

AI-powered blog article generation with specialized Claude Code agents.

## Installation

### Quick Install

```bash
/plugin marketplace add leobrival/blog-kit
/plugin install blog-kit
```

### Detailed Installation Guide

For complete installation instructions, troubleshooting, and verification steps, see [INSTALL.md](./INSTALL.md).

**What's included**:
- ✅ 11 slash commands (`/blog-*`)
- ✅ 8 specialized agents
- ✅ JSON template system (3 templates, 8 components)
- ✅ Complete documentation

## Quick Start

```bash
# 1. Setup or analyze existing content
/blog-setup                    # New blog (manual setup)
/blog-analyse                  # Existing blog (auto-detect)

# 2. Generate your first article
/blog-generate "Your article topic"
```

## Usage Examples

### Per-Article Commands (Recommended)

Work on a specific article by providing the slug:

```bash
# Single article optimization
/blog-optimize "en/nodejs-logging"

# Single article translation
/blog-translate "en/nodejs-logging" "fr"

# Single article image optimization
/blog-optimize-images "en/nodejs-logging"
```

**Token usage**: ~5k-15k tokens per article

### Global Commands (⚠️  High Token Usage)

Apply command to ALL articles in your blog:

```bash
# ⚠️  WARNING: This will analyze ALL articles (can use 50k-500k tokens)
/blog-optimize

# ⚠️  WARNING: This will validate translation coverage for ALL articles
/blog-translate

# ⚠️  WARNING: This will optimize images in ALL articles
/blog-optimize-images
```

**Token usage**: 50k-500k tokens depending on article count
**Cost**: Can be expensive if you have many articles
**Use case**: Initial setup, bulk operations, CI/CD pipelines

### Batch Commands (Controlled)

Process specific articles efficiently:

```bash
# Optimize multiple specific articles
/blog-optimize "en/article-1"
/blog-optimize "en/article-2"
/blog-optimize "fr/article-3"

# Translate specific articles to multiple languages
/blog-translate "en/microservices" "fr"
/blog-translate "en/microservices" "es"
/blog-translate "en/microservices" "de"
```

**Recommendation**: Process articles individually or in small batches to control token usage and costs.

## Features

- **Multi-agent workflow**: Research → SEO/GEO → Marketing
- **JSON-based templates**: ShadCN-inspired template system with strict validation
- **Template library**: Tutorial, Guide, Comparison templates with GEO components
- **Hierarchical configuration**: 5-level cascade (global → template → language → category → article)
- **Context optimization**: 99.5% token efficiency
- **File-based handoffs**: Zero context pollution
- **User checkpoints**: Review at each phase
- **Pure plugin**: No dependencies, scripts are local utilities only
- **Internationalization**: Multi-language article structure with automated translation
- **Translation validation**: Automated i18n coverage reports and missing translation detection
- **Image optimization**: Automated WebP conversion (80% quality)
- **GEO optimization**: AI search optimization (ChatGPT, Perplexity, Google AI Overviews)

## Commands

| Command | Description | Time |
|---------|-------------|------|
| `/blog-setup` | Setup wizard | 2 min |
| `/blog-analyse` | Analyze existing content → generate constitution | 10-15 min |
| `/blog-generate` | Full workflow | 30-45 min |
| `/blog-research` | Research only | 15-20 min |
| `/blog-seo` | SEO optimization (traditional search) | 5-10 min |
| `/blog-geo` | GEO optimization (AI search: ChatGPT, Perplexity, etc.) | 10-15 min |
| `/blog-marketing` | Marketing content | 10-15 min |
| `/blog-copywrite` | Spec-driven copy | 20-40 min |
| `/blog-optimize` | Quality validation | 10-15 min |
| `/blog-optimize-images` | Image compression (WebP) | 10-20 min |
| `/blog-translate` | i18n validation & translation | 2-20 min |

## What's Included in the Plugin

When you install this plugin, you get:

✅ **Commands** (`commands/*.md`) - Slash command workflows
✅ **Agents** (`agents/*.md`) - AI agent definitions
✅ **Plugin Config** (`.claude-plugin/`) - Metadata

**Note**: Scripts in `scripts/` are local development utilities and are NOT transferred via the plugin. They're only used for local validation and setup.

## Architecture

```
.templates/                → JSON-based template system (NEW)
├── registry.json         → Master template & component registry
├── schemas/              → JSON Schema validation (6 files)
├── types/                → Article templates (tutorial, guide, comparison)
└── components/           → Content components (quotation, statistic, code-block, etc.)

.specify/
├── research/             → Research reports (generated)
├── seo/                  → SEO briefs (generated)
├── geo/                  → GEO briefs (AI search optimization, generated)
└── quality/              → Validation reports (generated)

articles/                 → Final articles (i18n structure)
├── en/                   → English articles
│   ├── tutorials/        → Category-specific articles
│   │   ├── .category.json  → Category configuration
│   │   └── slug/
│   │       ├── article.md
│   │       └── images/
│   └── comparisons/
│       └── .category.json
└── fr/                   → French articles
    └── tutorials/
        └── .category.json

.spec/                    → Blog constitution (optional, /blog-setup)
```

## Template System

Blog Kit includes a JSON-based template system inspired by ShadCN's component architecture:

### Available Templates

- **Tutorial** (2000-3500 words): Step-by-step technical tutorials with code examples
- **Guide** (3000-5000 words): Comprehensive topic coverage with expert insights
- **Comparison** (1500-2500 words): Feature-by-feature tool/framework comparisons

### GEO-Optimized Components

Based on Princeton University research (30-40% visibility improvement):

- **Quotation**: Expert quotes with source attribution (115% boost)
- **Statistic**: Data points with credible sources
- **Citation**: External source references (115% boost)
- **Code Block**: Syntax-highlighted examples
- **Comparison Table**: Feature comparison grids
- **Callout**: Note/tip/warning boxes
- **FAQ Item**: Question and answer pairs
- **Pros & Cons**: Advantages and disadvantages lists

### Configuration Cascade

Templates support 5-level configuration inheritance:

1. **Global** (`.spec/blog.spec.json`) - Blog-wide constitution
2. **Template** (`.templates/types/*.json`) - Template defaults
3. **Language** (`articles/{lang}/.language.json`) - Language-specific settings
4. **Category** (`articles/{lang}/{category}/.category.json`) - Category rules
5. **Article** (`articles/{lang}/{category}/{slug}/article.json`) - Article-specific overrides

**Inheritance**: Lower levels override higher levels. Arrays merge (no duplicates), objects deep-merge.

### Creating Custom Templates

Users can create their own templates and categories. See [`.templates/README.md`](./.templates/README.md) for complete documentation.

## Documentation

- [`.templates/`](./.templates/) - JSON template system (schemas, templates, components)
- [`commands/`](./commands/) - Slash command definitions
- [`agents/`](./agents/) - AI agent specifications
- [`scripts/`](./scripts/) - Local bash utilities (not in plugin)
- [`CLAUDE.md`](./CLAUDE.md) - Context management guide
- [`docs/MULTIPLE-CLAUDE-FILES.md`](./docs/MULTIPLE-CLAUDE-FILES.md) - Using hierarchical CLAUDE.md files

## Philosophy

"Burn tokens in workers, preserve main thread"

- Agents process 50k-150k tokens each (isolated)
- Main thread uses <1k tokens (orchestration)
- File-based handoffs (no context accumulation)

## License

MIT
