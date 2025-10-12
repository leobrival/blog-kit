# Blog Kit

AI-powered blog article generation with specialized Claude Code agents.

## Installation

```bash
/plugin marketplace add leobrival/blog-kit
/plugin install blog-kit
```

## Usage

```bash
# Generate article
/blog-generate "Your article topic"
```

## Features

- **Multi-agent workflow**: Research → SEO → Marketing
- **Context optimization**: 99.5% token efficiency
- **File-based handoffs**: Zero context pollution
- **User checkpoints**: Review at each phase
- **Pure plugin**: No dependencies, scripts are local utilities only
- **Internationalization**: Multi-language article structure with automated translation
- **Translation validation**: Automated i18n coverage reports and missing translation detection
- **Image optimization**: Automated WebP conversion (80% quality)

## Commands

| Command | Description | Time |
|---------|-------------|------|
| `/blog-setup` | Setup wizard | 2 min |
| `/blog-generate` | Full workflow | 30-45 min |
| `/blog-research` | Research only | 15-20 min |
| `/blog-seo` | SEO only | 5-10 min |
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
.specify/
├── research/  → Research reports (generated)
├── seo/       → SEO briefs (generated)
└── quality/   → Validation reports (generated)

articles/      → Final articles (i18n structure)
├── en/        → English articles
│   └── slug/
│       ├── article.md
│       └── images/
│           ├── .backup/   → Original images
│           └── *.webp     → Optimized images
└── fr/        → French articles
    └── slug/
        ├── article.md
        └── images/

.spec/         → Blog constitution (optional, /blog-setup)
```

## Documentation

- [`commands/`](./commands/) - Slash command definitions
- [`agents/`](./agents/) - AI agent specifications
- [`scripts/`](./scripts/) - Local bash utilities (not in plugin)
- [`CLAUDE.md`](./CLAUDE.md) - Context management guide

## Philosophy

"Burn tokens in workers, preserve main thread"

- Agents process 50k-150k tokens each (isolated)
- Main thread uses <1k tokens (orchestration)
- File-based handoffs (no context accumulation)

## License

MIT
