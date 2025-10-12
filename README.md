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

## Commands

| Command | Description | Time |
|---------|-------------|------|
| `/blog-setup` | Setup wizard | 2 min |
| `/blog-generate` | Full workflow | 30-45 min |
| `/blog-research` | Research only | 15-20 min |
| `/blog-seo` | SEO only | 5-10 min |
| `/blog-marketing` | Content only | 10-15 min |

## Architecture

```
.specify/research/  → Research reports
.specify/seo/      → SEO briefs
articles/          → Final articles
```

## Documentation

- [`commands/`](./commands/) - Slash commands
- [`agents/`](./agents/) - AI agents
- [`scripts/`](./scripts/) - Bash utilities
- [`examples/`](./examples/) - Usage examples
- [`CLAUDE.md`](./CLAUDE.md) - Context management

## Philosophy

"Burn tokens in workers, preserve main thread"

- Agents process 50k-150k tokens each (isolated)
- Main thread uses <1k tokens (orchestration)
- File-based handoffs (no context accumulation)

## License

MIT
