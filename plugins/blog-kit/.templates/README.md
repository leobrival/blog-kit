# Blog Kit Template System

JSON-based article structuring system inspired by ShadCN's component architecture.

## Architecture Overview

The template system uses a **5-level configuration cascade** with intelligent merging:

```
1. Global         → .spec/blog.spec.json (blog constitution)
2. Template       → .templates/types/{template}.json
3. Language       → articles/{lang}/.language.json
4. Category       → articles/{lang}/{category}/.category.json
5. Article        → articles/{lang}/{category}/{slug}/article.json
```

**Inheritance**: Lower levels override higher levels. Arrays are merged (no duplicates), objects are deep-merged.

## Directory Structure

```
.templates/
├── registry.json                  # Master template and component registry
├── schemas/                       # JSON Schema definitions
│   ├── article.schema.json       # Base article schema
│   ├── meta.schema.json          # Article metadata
│   ├── frontmatter.schema.json   # SEO/GEO frontmatter
│   ├── structure.schema.json     # Section structure
│   ├── category.schema.json      # Category configuration
│   └── components.schema.json    # Component definitions
├── types/                         # Article templates
│   ├── tutorial.template.json    # Tutorial template (2000-3500 words)
│   ├── guide.template.json       # Complete guide (3000-5000 words)
│   └── comparison.template.json  # Comparison (1500-2500 words)
└── components/                    # Content components
    ├── quotation.json            # GEO: quotations (Princeton)
    ├── statistic.json            # GEO: statistics (Princeton)
    ├── citation.json             # GEO: cite-sources (Princeton)
    ├── code-block.json           # Code examples
    ├── comparison-table.json     # Feature comparison
    ├── callout.json              # Note/tip/warning boxes
    ├── faq-item.json             # FAQ Q&A pairs
    └── pros-cons.json            # Pros & cons lists
```

## Templates

### Tutorial
- **Purpose**: Step-by-step technical tutorials
- **Length**: 2000-3500 words (8-12 min read)
- **Structure**: Intro → Prerequisites → Steps → Testing → Conclusion
- **Components**: code-block (required), quotation, callout
- **GEO**: Moderate (2-4 quotations, 1-3 statistics, 5-8 sources)

### Guide
- **Purpose**: Comprehensive topic coverage
- **Length**: 3000-5000 words (12-20 min read)
- **Structure**: Intro → Fundamentals → Deep-dive → Best Practices → Conclusion
- **Components**: quotation (required), statistic (required), comparison-table
- **GEO**: Aggressive (4-8 quotations, 3-6 statistics, 7-12 sources)

### Comparison
- **Purpose**: Feature-by-feature tool/framework comparison
- **Length**: 1500-2500 words (6-10 min read)
- **Structure**: Intro → Overviews → Comparison Table → Detailed → Pros/Cons → Conclusion
- **Components**: comparison-table (required), pros-cons (required), quotation
- **GEO**: Moderate (2-4 quotations, 2-5 statistics, 5-8 sources)

## GEO Components (Princeton Methods)

Based on Princeton University GEO research (30-40% visibility improvement):

### 1. Quotation (quotations method)
- **Effect**: 115% increase for lower-ranked sites
- **Best for**: People & Society, Explanation, History, Education
- **Usage**: Expert quotes with source attribution

```json
{
  "type": "quotation",
  "data": {
    "text": "Distributed tracing provides visibility...",
    "author": "Jane Smith",
    "source": "OpenTelemetry Docs",
    "role": "Principal Engineer",
    "url": "https://..."
  }
}
```

### 2. Statistic (statistics method)
- **Best for**: Law & Government, Business, Technical content
- **Usage**: Data points with credible sources

```json
{
  "type": "statistic",
  "data": {
    "value": "40%",
    "description": "faster incident resolution with tracing",
    "source": "Datadog 2024 Report",
    "url": "https://...",
    "year": "2024"
  }
}
```

### 3. Citation (cite-sources method)
- **Effect**: 115% increase for lower-ranked sites
- **Best for**: All content types
- **Usage**: External source references

```json
{
  "type": "citation",
  "data": {
    "statement": "OpenTelemetry provides vendor-agnostic...",
    "source": "OpenTelemetry Documentation",
    "url": "https://...",
    "sourceType": "official-docs"
  }
}
```

## Configuration Cascade Example

### Global Constitution (`.spec/blog.spec.json`)
```json
{
  "constitution": {
    "tone": "expert",
    "voiceDo": ["Be clear", "Be accurate"]
  }
}
```

### Category Config (`articles/en/tutorials/.category.json`)
```json
{
  "constitution": {
    "tone": "pédagogique",
    "voiceDo": ["Clear steps", "Code examples"]
  },
  "geo": {
    "requiredMethods": ["cite-sources", "quotations"],
    "quotations": { "min": 2, "max": 4 }
  }
}
```

### Article Instance (`articles/en/tutorials/nodejs-tracing/article.json`)
```json
{
  "templateId": "tutorial",
  "meta": {
    "slug": "nodejs-tracing",
    "language": "en",
    "category": "tutorials"
  },
  "frontmatter": {
    "title": "Node.js Tracing: Complete Tutorial",
    "seo": {
      "primaryKeyword": "nodejs tracing"
    },
    "geo": {
      "optimized": true,
      "methods": ["cite-sources", "quotations", "statistics"]
    }
  },
  "structure": {
    "sections": [
      {
        "id": "intro",
        "heading": "What is Application Tracing?",
        "level": "h2",
        "components": [
          {
            "type": "quotation",
            "data": {
              "text": "Application tracing captures...",
              "author": "OpenTelemetry Docs",
              "source": "https://opentelemetry.io/docs"
            }
          }
        ]
      }
    ]
  }
}
```

**Result**: Article inherits:
- Global: `tone: "expert"` (overridden by category)
- Template: Tutorial structure with 4-7 H2 sections
- Category: `tone: "pédagogique"` + GEO requirements
- Article: Specific content and components

## Validation

All JSON files are validated against JSON Schema (draft-07):

### Strict Validation (Default)
- Blocks non-compliant articles from generation
- Enforces required components
- Validates word count ranges
- Checks GEO requirements

### Validation Levels
1. **Schema validation**: JSON structure correctness
2. **Template validation**: Required sections and components
3. **SEO validation**: Keyword density, heading count
4. **GEO validation**: Quotations, statistics, source count
5. **Constitution validation**: Tone and voice guidelines

## Usage Examples

### Creating an Article

1. **Choose a template**: `tutorial`, `guide`, or `comparison`
2. **Create article.json**:

```json
{
  "$schema": "../../../.templates/schemas/article.schema.json",
  "templateId": "tutorial",
  "version": "1.0.0",
  "meta": {
    "slug": "nodejs-tracing",
    "language": "en",
    "category": "tutorials"
  },
  "frontmatter": {
    "title": "Node.js Application Tracing: Complete Guide",
    "description": "Learn distributed tracing in Node.js...",
    "date": "2025-10-13",
    "tags": ["nodejs", "tracing", "opentelemetry"],
    "seo": {
      "primaryKeyword": "nodejs tracing",
      "secondaryKeywords": ["distributed tracing", "opentelemetry nodejs"]
    },
    "geo": {
      "optimized": true,
      "methods": ["cite-sources", "quotations", "statistics"]
    }
  },
  "structure": {
    "sections": [
      {
        "id": "intro",
        "heading": "Introduction to Node.js Tracing",
        "level": "h2",
        "content": "Application tracing is a method...",
        "components": [
          {
            "type": "quotation",
            "data": {
              "text": "Distributed tracing provides visibility...",
              "author": "OpenTelemetry Team",
              "source": "OpenTelemetry Documentation",
              "url": "https://opentelemetry.io/docs"
            }
          }
        ]
      }
    ]
  }
}
```

3. **Compile to Markdown**: Use `/blog-compile` command (future)

### Category Configuration

Create `.category.json` in category directories:

```json
{
  "$schema": "../../../.templates/schemas/category.schema.json",
  "category": {
    "id": "tutorials",
    "name": "Tutorials",
    "language": "en",
    "icon": "📚"
  },
  "template": {
    "default": "tutorial",
    "enforceStructure": true
  },
  "constitution": {
    "tone": "pédagogique",
    "voiceDo": ["Clear steps", "Code examples"]
  },
  "geo": {
    "strategy": "moderate",
    "requiredMethods": ["cite-sources", "quotations"]
  }
}
```

## Registry Usage

The registry (`registry.json`) provides:
- Template metadata and use cases
- Component definitions and GEO optimization status
- Predefined categories with defaults
- Icon mappings

Access templates programmatically:

```javascript
const registry = require('./.templates/registry.json');

// Get tutorial template
const tutorial = registry.templates.tutorial;
console.log(tutorial.estimatedLength); // "2000-3500 words"

// Get GEO components
const geoComponents = Object.entries(registry.components)
  .filter(([_, comp]) => comp.geoOptimized);
// → [quotation, statistic, citation]
```

## Princeton GEO Methods

Based on Princeton University research (November 2023):

### Top 3 Methods (30-40% visibility improvement)

1. **Cite Sources** (115% increase for lower-ranked sites)
   - Link to authoritative sources
   - Use official documentation, research papers, standards
   - 5-7 sources minimum for comprehensive articles

2. **Add Quotations** (Best for People & Society domains)
   - Expert quotes from recognized authorities
   - Include author credentials (E-E-A-T)
   - 2-8 quotations depending on article length

3. **Include Statistics** (Best for Law/Government content)
   - Data points with source attribution
   - Recent statistics (1-2 years old = 3.2x more citations)
   - 1-6 statistics depending on article length

### E-E-A-T Signals
- **Experience**: Real-world insights and examples
- **Expertise**: Demonstrate comprehensive knowledge
- **Authoritativeness**: Cite multiple credible sources
- **Trustworthiness**: Balanced, objective analysis

## Future Enhancements

### Commands (To Be Created)
- `/blog-scaffold` - Create article from template
- `/blog-validate-structure` - Validate JSON against schema
- `/blog-compile` - Generate markdown from JSON
- `/blog-categories` - Manage categories

### Agents (To Be Created)
- `template-builder` - Generate article.json from templates
- Integration with existing `research-intelligence`, `seo-specialist`, `geo-specialist`, `marketing-specialist`

### Presets (Future)
- `technical-tutorial.json` - Opinionated tutorial preset
- `seo-geo-optimized.json` - Maximum optimization preset
- `beginner-guide.json` - Beginner-friendly preset

## Benefits

✅ **JSON as source of truth** - No markdown ambiguity
✅ **Strict validation** - Catch errors before generation
✅ **Hierarchical configuration** - Flexible inheritance
✅ **GEO optimization** - Princeton methods built-in
✅ **Component reusability** - DRY content elements
✅ **Template consistency** - Enforced structure
✅ **i18n support** - Language and category organization
✅ **Schema validation** - IDE autocomplete and validation

## Comparison with ShadCN

| Aspect | ShadCN | Blog Kit |
|--------|--------|----------|
| **Purpose** | UI components | Blog articles |
| **Registry** | components.json | registry.json |
| **Schema** | Component definitions | Article templates |
| **Inheritance** | Variants | 5-level cascade |
| **Validation** | TypeScript types | JSON Schema |
| **Output** | JSX/TSX components | Markdown articles |

## Research Foundation

This system is based on comprehensive research:

- **Article Types**: 15 types researched (tutorial, guide, comparison, etc.)
- **Word Counts**: Industry-standard ranges per type
- **Component Matrix**: Optimal components per article type
- **GEO Methods**: Princeton University research (27 sources)
- **Content Mix**: 10-15% pillar, 60-70% core, 20-30% supplementary

See: `.specify/research/blog-article-types-templates-research.md`

## License

MIT
