# Agents

Specialized AI agents for blog article generation.

## Available Agents

### Setup & Analysis

- **`analyzer.md`** - Content analyzer and constitution generator (reverse-engineering)

### Content Generation

- **`research-intelligence.md`** - Deep research with source validation
- **`seo-specialist.md`** - Keyword analysis and content structure
- **`marketing-specialist.md`** - Conversion-focused content creation
- **`copywriter.md`** - Spec-driven copywriting with brand voice compliance

### Quality & Optimization

- **`quality-optimizer.md`** - Automated validation (frontmatter, markdown, SEO, images)

### Translation & i18n

- **`translator.md`** - Multi-language translation with structure validation

## Agent Workflows

### Constitution Generation (Reverse Engineering)
```
Existing Content → Analyzer → blog.spec.json
  (sample 10)       (15k)       (constitution)

Phases:
1. Content Discovery (scan directories)
2. Language Detection (i18n or single)
3. Tone Analysis (expert/pédagogique/convivial/corporate)
4. Pattern Extraction (voice_do/voice_dont)
5. Constitution Generation (.spec/blog.spec.json)
```

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

### Translation & i18n
```
Structure Check → Translator → Coverage Report
                  (validation script in /tmp/)

Source Article → Translator → Translated Article
  (en)            (preserves technical accuracy)  (fr/es/de)
```

Each agent runs in isolated context with fresh token budget.
