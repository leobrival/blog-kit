# CLAUDE.md

Instructions for Claude Code when working with the Blog-Kit project.

## Project Overview

**Blog-Kit** is an AI-optimized blog article generation toolkit using specialized Claude Code agents for comprehensive, SEO-optimized content creation.

**Core Philosophy**: "Burn tokens in specialized workers, preserve focus in main thread"

## Architecture

### Core Agents (100% ACTION-Oriented)

1. **research-intelligence** (`agents/research-intelligence.md`) - ACTION
   - Deep research with 5-7 credible sources
   - Cross-references findings
   - **Generates article draft** (NEW)
   - Outputs:
     - `articles/[topic]-draft.md` (~2k-3k words) ✅ **ACTIONABLE**
     - `.specify/research/[topic]-research.md` (research report)

2. **seo-specialist** (`agents/seo-specialist.md`) - ACTION
   - Keyword analysis and search intent
   - Content structure design (H2/H3 outline)
   - Detects TOFU/MOFU/BOFU funnel stage
   - Suggests post type (actionnable/aspirationnel/analytique/anthropologique)
   - Outputs: `.specify/seo/[topic]-seo-brief.md` (~2k tokens) ✅ **ACTIONABLE**

3. **marketing-specialist** (`agents/marketing-specialist.md`) - ACTION
   - Engaging content with CTAs
   - Social proof integration
   - Applies post type + funnel stage frameworks
   - Outputs: `articles/[topic].md` (final article) ✅ **ACTIONABLE**

4. **quality-optimizer** (`agents/quality-optimizer.md`) - ACTION
   - Validates article structure and compliance
   - **Auto-fixes detected issues** (NEW)
   - Corrects frontmatter, structure, post type compliance
   - Outputs:
     - `articles/[topic].md` (auto-corrected version) ✅ **ACTIONABLE**
     - `.specify/quality/[topic]-fixes.md` (changelog)

5. **analyzer** (`agents/analyzer.md`) - ACTION
   - Analyzes existing content
   - Generates constitution + category configs
   - **Batch updates all articles** with missing metadata (NEW)
   - Outputs:
     - `.spec/blog.spec.json` (constitution) ✅
     - `.category.json` files (per category) ✅
     - `articles/**/*.md` (all articles updated) ✅ **ACTIONABLE**

6. **persona-specialist** (`agents/persona-specialist.md`) - ACTION (NEW)
   - Creates behaviorally-validated audience personas
   - Uses Jobs-to-be-Done, Forces of Progress, Customer Awareness frameworks
   - Researches audience behaviors from forums, reviews, discussions
   - Outputs:
     - `.spec/personas/[id].json` (complete persona) ✅ **ACTIONABLE**
     - `.spec/personas/registry.json` (persona catalog) ✅
     - `.specify/personas/[id]-report.md` (targeting guide) ✅ **ACTIONABLE**

### Workflow Commands

- **`/blog-setup`** - Initial blog configuration
- **`/blog-analyse`** - Analyze existing content → constitution + batch update
- **`/blog-personas`** - Create/manage audience personas (NEW)
- **`/blog-generate "topic"`** - Full workflow (Research → SEO → Marketing)
- **`/blog-research "topic"`** - Research phase only
- **`/blog-seo "topic"`** - SEO optimization phase only
- **`/blog-marketing "topic"`** - Content creation phase only
- **`/blog-optimize "topic"`** - Quality validation + auto-fix

### Template System (NEW)

**JSON-based template system** inspired by ShadCN's component architecture:

- **Registry**: `.templates/registry.json` - Master template & component catalog
- **Schemas**: `.templates/schemas/` - JSON Schema validation (6 files)
- **Templates**: `.templates/types/` - Article templates (tutorial, guide, comparison)
- **Components**: `.templates/components/` - Content components (8 GEO-optimized components)

**5-Level Configuration Cascade**:
1. Global (`.spec/blog.spec.json`) → Blog constitution
2. Template (`.templates/types/*.json`) → Template defaults
3. Language (`articles/{lang}/.language.json`) → Language settings
4. Category (`articles/{lang}/{category}/.category.json`) → Category rules
5. Article (`articles/{lang}/{category}/{slug}/article.json`) → Article overrides

**Key Features**:
- JSON as source of truth (strict validation)
- GEO components with Princeton methods (quotation, statistic, citation)
- User-extensible (create custom templates/categories/components)
- Hierarchical inheritance with intelligent merging

## Context Management Rules

### DO NOT Automatically Load

❌ `.specify/` directory
- Research reports are 5k tokens each
- SEO briefs are 2k tokens each
- Agents will load these explicitly when needed

❌ `articles/` directory
- Final articles are 3k+ tokens each
- Not relevant for new article generation

❌ `content/` directory (legacy)
- Old structure, not used in agent workflow

❌ Previous research reports
- Each article is independent
- Historical research not relevant

### DO Automatically Load

✅ `CLAUDE.md` (this file)
- Essential project context

✅ `commands/*.md` (only when user invokes command)
- Command definitions loaded on demand

✅ `agents/*.md` (only when creating subagent)
- Agent instructions loaded when spawning subagent

✅ `.templates/` (when working on templates)
- Template schemas, definitions, and component specs
- Load only when user is creating/modifying templates

✅ `.claude-plugin/` metadata
- Plugin configuration files

## Token Budget Philosophy

**Main Thread** (orchestration only):
- Target: <1k tokens per article generation
- Role: Coordinate agents, display checkpoints, handle user input
- Avoid: Loading large files, processing data, long outputs

**Agents** (processing):
- Target: 50k-150k tokens each (isolated contexts)
- Role: Research, analysis, content creation
- Freedom: Burn tokens freely without affecting main thread

**Total per Article**:
- Combined agent processing: ~200k tokens
- Main thread usage: <1k tokens
- Context efficiency: 99.5%

## Workflow Patterns

### Full Article Generation

```bash
/blog-generate "Your Topic"
```

**Expected Flow (100% ACTION)**:
1. Create `research-intelligence` subagent → **outputs article draft** ✅
2. User checkpoint: Review draft quality
3. Create `seo-specialist` subagent → outputs SEO brief + **refines draft** ✅
4. User checkpoint: Approve keywords and structure
5. Create `marketing-specialist` subagent → **outputs final article** ✅
6. User checkpoint: Review and finalize
7. (Optional) Create `quality-optimizer` subagent → **auto-fixes issues** ✅

**Key Difference**: Every agent now produces actionable content, not just analysis.

**Duration**: 30-45 minutes
**Token Usage**: ~200k (agents) + <1k (main thread)
**Output**: Draft + SEO brief + Final article + (optional) Auto-corrected version

### Individual Phases

For iterating on specific parts:

```bash
/blog-research "topic"    # Research + generate draft ✅
/blog-seo "topic"         # Regenerate SEO brief ✅
/blog-marketing "topic"   # Rewrite article ✅
/blog-optimize "topic"    # Validate + auto-fix issues ✅
```

## File Structure

```
blog-kit/
├── .claude-plugin/          # Plugin metadata
│   ├── plugin.json
│   └── marketplace.json
├── .templates/              # JSON template system
│   ├── registry.json       # Master template & component registry
│   ├── schemas/            # JSON Schema validation (6 files)
│   ├── types/              # Article templates (tutorial, guide, comparison)
│   ├── components/         # Content components (8 GEO-optimized)
│   └── README.md           # Template system documentation
├── .spec/                   # Blog configuration
│   ├── blog.spec.json      # Blog constitution
│   └── personas/           # Audience personas (NEW)
│       ├── schema.json     # Persona validation schema
│       ├── registry.json   # Persona catalog
│       └── *.json          # Individual personas
├── commands/                # Slash commands (12 commands)
│   ├── blog-generate.md    # Orchestrator
│   ├── blog-research.md
│   ├── blog-seo.md
│   ├── blog-marketing.md
│   ├── blog-personas.md    # Persona management (NEW)
│   └── ...
├── agents/                  # Subagent definitions (9 agents)
│   ├── research-intelligence.md
│   ├── seo-specialist.md
│   ├── geo-specialist.md
│   ├── marketing-specialist.md
│   ├── persona-specialist.md  # Persona creator (NEW)
│   └── ...
├── .specify/                # Generated artifacts (gitignored)
│   ├── research/
│   ├── seo/
│   ├── geo/
│   ├── quality/
│   └── personas/           # Persona reports (NEW)
├── articles/                # Generated articles (i18n structure)
│   ├── en/
│   │   ├── tutorials/
│   │   │   ├── .category.json
│   │   │   └── slug/
│   │   └── comparisons/
│   │       └── .category.json
│   └── fr/
├── CLAUDE.md               # This file
└── README.md               # User documentation
```

## Output Locations

All generated files use sanitized topic names:
- Convert to lowercase
- Replace spaces with hyphens
- Remove special characters
- Example: "Node.js Tracing" → "nodejs-tracing"

**Article drafts**: `articles/[sanitized-topic]-draft.md` ✅ **NEW** (from research-intelligence)
**Research reports**: `.specify/research/[sanitized-topic]-research.md`
**SEO briefs**: `.specify/seo/[sanitized-topic]-seo-brief.md`
**Final articles**: `articles/[sanitized-topic].md`
**Auto-fixed articles**: `articles/[sanitized-topic].md` (corrected in-place by quality-optimizer)

## Agent Communication

**File-Based Handoffs** (not context passing):

```
Research Agent (ACTION)
  ↓ (saves draft + report)
articles/[topic]-draft.md ✅ + .specify/research/[topic]-research.md
  ↓ (SEO agent reads both)
SEO Agent (ACTION)
  ↓ (saves brief)
.specify/seo/[topic]-seo-brief.md ✅
  ↓ (Marketing agent reads draft + report + brief)
Marketing Agent (ACTION)
  ↓ (saves final article)
articles/[topic].md ✅
  ↓ (Quality optimizer reads article)
Quality Optimizer (ACTION)
  ↓ (auto-fixes + saves corrected version)
articles/[topic].md (corrected) ✅
```

**Why File-Based + Action-Oriented**:
- Each agent starts with fresh context (no pollution)
- Main thread never accumulates context
- Agents can process unlimited data in isolation
- Explicit input/output contracts
- **Every agent produces actionable output** (draft, brief, or final content)
- **No dead-end analysis** - all artifacts are used in the workflow

## Best Practices

### For Orchestration (Main Thread)

1. **Keep it minimal**:
   - Display checkpoints
   - Ask for user input
   - Show progress
   - Avoid long explanations

2. **Never load generated files directly**:
   - Don't read research reports in main thread
   - Don't read SEO briefs in main thread
   - Let agents handle file loading

3. **User checkpoints are critical**:
   - After research: Verify quality
   - After SEO: Approve direction
   - After marketing: Review article
   - Allow iterations at each stage

### For Agent Invocation

1. **Be explicit in prompts**:
   - Specify exact file paths
   - Reference agent instructions
   - Clarify output location
   - Define success criteria

2. **Trust agent autonomy**:
   - Agents have full process documentation
   - Let them follow their phases
   - Don't micromanage
   - Review outputs, not process

3. **Handle errors gracefully**:
   - Display clear error messages
   - Preserve successful phases
   - Offer retry options
   - Don't restart entire workflow

## Session Management

### Between Articles

```bash
# After completing article generation
/clear  # Start fresh for next article
```

**Why**: Each article is independent. No need to keep previous context.

### During Iterations

```bash
# If refining same article
/compact  # Summarize history, keep recent context
```

**Why**: Preserve context for current article while reducing token bloat.

## Common Tasks

### Setup & Configuration

```bash
# Initial setup (new blog)
/blog-setup

# Analyze existing content (existing blog)
/blog-analyse

# Create audience personas
/blog-personas create "Freelance Developer"
/blog-personas create "Startup Founder"
```

### Content Generation

```bash
# Generate new article
/blog-generate "Best practices for microservices logging"

# Update existing research
/blog-research "microservices-logging"

# Change SEO angle
/blog-seo "microservices-logging"

# Rewrite article section
/blog-marketing "microservices-logging"
```

### Persona Management

```bash
# List all personas
/blog-personas list

# Update persona with new data
/blog-personas update "developer-freelance"

# Validate persona
/blog-personas validate "developer-freelance"
```

### Quality & Optimization

```bash
# Validate and auto-fix article
/blog-optimize "article-slug"

# Translate article
/blog-translate "en/article-slug" "fr"
```

## Troubleshooting

### "Research file not found"
- Verify `.specify/research/` directory exists
- Check topic name sanitization
- Ensure research agent completed successfully

### "SEO brief incomplete"
- Research report might be too short
- Verify research has quality sources
- Check if WebSearch is available

### "Article doesn't match SEO brief"
- Marketing agent may have misinterpreted structure
- Provide clearer feedback
- Regenerate with specific instructions

### "Context window full"
- This shouldn't happen with proper agent usage
- If it does: `/clear` and restart
- Verify files aren't being loaded in main thread

## Performance Expectations

**Research Phase**:
- Time: 15-20 minutes
- Sources: 5-7 credible sources
- Output: 3-5k tokens

**SEO Phase**:
- Time: 5-10 minutes
- Keywords: 1 primary + 3-5 secondary
- Output: 1.5-2.5k tokens

**Marketing Phase**:
- Time: 10-15 minutes
- Word count: 1,500-3,000 words (per SEO brief)
- Output: 3-5k tokens

**Total Workflow**:
- Time: 30-45 minutes
- Token usage: 200k+ (agents in isolation)
- Main thread: <1k tokens

## Success Metrics

Quality indicators for generated articles:

✅ **Research Report**:
- 5-7 distinct sources
- Multiple perspectives
- Credible citations
- Actionable insights

✅ **SEO Brief**:
- Clear primary keyword
- Logical structure
- Realistic word count
- Compelling headlines

✅ **Final Article**:
- Engaging introduction
- Follows SEO structure
- Social proof integrated
- 2-3 strategic CTAs
- Professional tone
- Accurate information

## Version & Compatibility

- **Claude Code**: Requires Claude Code CLI
- **Claude Model**: Works best with Sonnet 4.5+
- **Tools Required**: WebSearch, WebFetch (for research)
- **Platform**: macOS, Linux, Windows (with WSL)

## Support & Documentation

- **Installation**: See README.md
- **Template System**: See .templates/README.md for complete documentation
- **Examples**: See examples/example-workflow.md
- **Agents**: See agents/*.md for detailed specs
- **Commands**: See commands/*.md for usage

---

## Final Notes

This project is designed to **maximize agent productivity** while **minimizing main thread context**. The architecture enables:

- **Unlimited processing**: Agents can burn tokens freely
- **Zero context rot**: Main thread stays clean
- **Parallel potential**: Multiple articles can be generated independently
- **Easy iteration**: Regenerate any phase without affecting others

**Remember**: Trust the agents. They're designed to work autonomously. Your role is to orchestrate, review checkpoints, and provide feedback.
