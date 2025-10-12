# Agents

Specialized AI agents for blog article generation.

## Available Agents

### Content Generation

- **`research-intelligence.md`** - Deep research with source validation
- **`seo-specialist.md`** - Keyword analysis and content structure
- **`marketing-specialist.md`** - Conversion-focused content creation
- **`copywriter.md`** - Spec-driven copywriting with brand voice compliance

### Quality & Optimization

- **`quality-optimizer.md`** - Automated validation (frontmatter, markdown, SEO)

## Agent Workflows

### Full Article Generation
```
Research → SEO → Marketing
  (5k)     (2k)    (3k tokens)
```

### Spec-Driven Copywriting
```
Constitution → Copywriter → Quality Check
  (spec)        (5k)          (validation)
```

### Quality Validation
```
Article → Quality Optimizer → Validation Report
           (scripts in /tmp/)   (actionable fixes)
```

Each agent runs in isolated context with fresh token budget.
