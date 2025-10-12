# Blog Kit

AI-powered blog article generation with specialized Claude Code agents and optimized context management.

Inspired by [spec-kit](https://github.com/github/spec-kit), adapted for content creation with multi-agent workflows: Research → SEO → Marketing.

## ⚡ Quick Start (Claude Code Plugin)

```bash
/plugin marketplace add leobrival/blog-kit
/plugin install blog-kit
```

Then generate your first article:
```bash
/blog-generate "Best practices for implementing observability in microservices"
```

**That's it!** The plugin orchestrates three specialized agents to create a comprehensive, SEO-optimized article in 30-45 minutes.

## 🚀 Key Features

- **🤖 Specialized AI Agents**: Research Intelligence, SEO Specialist, Marketing Specialist
- **🎯 Context Optimization**: "Burn tokens in workers, preserve main thread" architecture
- **📊 Token Efficient**: ~200k tokens processed, <1k in main thread (99.5% efficiency)
- **🔄 File-Based Handoffs**: Agents communicate via files, not context accumulation
- **✅ User Checkpoints**: Review and approve at each phase
- **🛠️ Flexible Workflow**: Use full pipeline or individual commands

## 📋 Available Commands

### Main Workflow

**`/blog-generate "topic"`** - Complete article generation (30-45 min)
- Research (15-20 min) → SEO (5-10 min) → Marketing (10-15 min)
- User checkpoints between phases
- Outputs: Research report, SEO brief, final article

### Individual Commands

**`/blog-research "topic"`** - Deep research only (15-20 min)
- 5-7 credible sources
- Cross-referenced findings
- Output: `.specify/research/[topic]-research.md`

**`/blog-seo "topic"`** - SEO optimization only (5-10 min)
- Keyword analysis
- Content structure (H2/H3 outline)
- Output: `.specify/seo/[topic]-seo-brief.md`

**`/blog-marketing "topic"`** - Content creation only (10-15 min)
- Engaging article with CTAs
- Social proof integration
- Output: `articles/[topic].md`

## 🎯 Usage Examples

### Generate Complete Article

```bash
/blog-generate "Implementing distributed tracing in Node.js with OpenTelemetry"
```

**Workflow**:
1. **Research Agent** gathers 5-7 sources, creates comprehensive report
2. **User Checkpoint**: Review research quality
3. **SEO Agent** analyzes keywords, creates content structure
4. **User Checkpoint**: Approve headlines and outline
5. **Marketing Agent** writes final article with CTAs
6. **User Checkpoint**: Review and finalize

**Output**:
```
.specify/
├── research/
│   └── implementing-distributed-tracing-nodejs-opentelemetry-research.md
└── seo/
    └── implementing-distributed-tracing-nodejs-opentelemetry-seo-brief.md

articles/
└── implementing-distributed-tracing-nodejs-opentelemetry.md
```

### Regenerate Specific Phase

```bash
# Update research with newer sources
/blog-research "nodejs-opentelemetry-tracing"

# Try different SEO angle
/blog-seo "nodejs-opentelemetry-tracing"

# Rewrite article with different tone
/blog-marketing "nodejs-opentelemetry-tracing"
```

## 📁 Project Structure

```
blog-kit/
├── .claude-plugin/              # Plugin metadata
│   ├── plugin.json             # Plugin configuration
│   └── marketplace.json        # Marketplace entry
├── commands/                    # Slash commands
│   ├── blog-generate.md        # Main orchestrator
│   ├── blog-research.md        # Research command
│   ├── blog-seo.md            # SEO command
│   └── blog-marketing.md       # Marketing command
├── agents/                      # Subagent definitions
│   ├── research-intelligence.md  # Research specialist (WebSearch, WebFetch, Read, Write)
│   ├── seo-specialist.md        # SEO specialist (Read, Write, WebSearch, Grep)
│   └── marketing-specialist.md  # Marketing specialist (Read, Write, Grep)
├── .specify/                    # Generated artifacts (gitignored)
│   ├── research/               # Research reports (~5k tokens each)
│   └── seo/                    # SEO briefs (~2k tokens each)
├── articles/                    # Generated articles (gitignored)
├── examples/                    # Example workflows
├── CLAUDE.md                   # Context management instructions
├── README.md                   # This file
└── package.json
```

## 🤖 Specialized Agents

### Research Intelligence Specialist

**Role**: Comprehensive multi-source research

**Process**:
1. **Strategic Planning**: Decompose topic into 3-5 sub-questions
2. **Autonomous Retrieval**: Execute 5-7 searches, evaluate sources
3. **Synthesis**: Generate structured report with citations

**Tools**: WebSearch, WebFetch, Read, Write

**Output**: `.specify/research/[topic]-research.md` (~5k tokens)
- Executive summary with key takeaways
- Findings organized by sub-questions
- 5-7 credible source citations
- Contradictions/debates (if any)
- Actionable insights

### SEO Specialist

**Role**: Keyword analysis and content structure design

**Process**:
1. **Keyword Analysis**: Extract and validate target keywords
2. **Search Intent**: Determine what users want (Informational/Navigational/Transactional)
3. **Content Structure**: Create H2/H3 outline with headline options
4. **SEO Recommendations**: Optimize for search engines

**Tools**: Read, Write, WebSearch, Grep

**Output**: `.specify/seo/[topic]-seo-brief.md` (~2k tokens)
- Target keywords (primary, secondary, LSI)
- Search intent classification
- 5-7 headline options
- Complete H2/H3 outline
- Meta description
- SEO recommendations

### Marketing Specialist

**Role**: Conversion-focused content creation

**Process**:
1. **Context Loading**: Extract essential info from research + SEO brief (token-efficient)
2. **Content Creation**: Write engaging article following SEO structure
3. **Polish**: Refine for readability, engagement, SEO compliance

**Tools**: Read, Write, Grep

**Output**: `articles/[topic].md` (final article)
- Engaging introduction with hook
- Body content with social proof
- 2-3 strategic CTAs
- FAQ section
- Conclusion with takeaways
- Proper frontmatter

## 🧠 Context Management Philosophy

### "Burn Tokens in Workers, Preserve Main Thread"

**Problem**: Traditional approach accumulates context → context rot → slower performance

**Solution**: Agent isolation with file-based handoffs

```
Main Thread (Orchestration)      Agent Contexts (Isolated)
────────────────────────         ──────────────────────────
<1k tokens                       Research: 50k-150k tokens
  │                                   │
  ├─ Spawn research agent            ├─ Web searches
  ├─ Show checkpoint                 ├─ Source evaluation
  ├─ Spawn SEO agent                 └─ Report generation
  ├─ Show checkpoint                     ↓
  ├─ Spawn marketing agent          (saves to file)
  └─ Show checkpoint                     ↓
                                    SEO: 20k-50k tokens
Total: <1k tokens                      │
                                       ├─ Keyword analysis
                                       ├─ Competitor research
                                       └─ Structure creation
                                           ↓
                                      (saves to file)
                                           ↓
                                    Marketing: 30k-50k tokens
                                       │
                                       ├─ Content writing
                                       ├─ CTA placement
                                       └─ Polish
                                           ↓
                                      (saves to file)
                                           ↓
                                    articles/[topic].md
```

**Benefits**:
- ✅ Unlimited agent processing (each has fresh context window)
- ✅ Zero context rot (main thread stays clean)
- ✅ Parallel potential (multiple articles independently)
- ✅ Easy iteration (regenerate any phase without affecting others)

## ⚙️ Technical Details

### Token Budget

| Phase | Time | Tokens | Output |
|-------|------|--------|--------|
| **Research** | 15-20 min | 50k-150k | 5k tokens (research report) |
| **SEO** | 5-10 min | 20k-50k | 2k tokens (SEO brief) |
| **Marketing** | 10-15 min | 30k-50k | 3k tokens (article) |
| **Total** | **30-45 min** | **~200k** | **Full article** |
| **Main Thread** | - | **<1k** | **Orchestration only** |

**Efficiency**: 99.5% token savings in main thread

### File-Based Handoffs

Agents communicate through files, not context:

```bash
# Research Agent
.specify/research/[topic]-research.md  # 5k tokens

# ↓ SEO Agent reads file ↓

# SEO Agent
.specify/seo/[topic]-seo-brief.md      # 2k tokens

# ↓ Marketing Agent reads both files ↓

# Marketing Agent
articles/[topic].md                     # Final article
```

**Why File-Based?**
- Each agent starts with fresh context (no pollution)
- Main thread never loads generated files
- Explicit input/output contracts
- Agents can process unlimited data in isolation

### Topic Sanitization

All filenames use sanitized topic names:
- Convert to lowercase
- Replace spaces with hyphens
- Remove special characters
- Example: "Node.js Tracing" → "nodejs-tracing"

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Context management instructions for Claude Code
- **[examples/example-workflow.md](./examples/example-workflow.md)** - Complete workflow example
- **[agents/](./agents/)** - Detailed agent specifications
- **[commands/](./commands/)** - Command usage guides

## 🛠️ Tech Stack

- **Claude Code**: CLI tool for AI-assisted development
- **Claude Sonnet 4.5+**: AI model powering agents
- **Tools**: WebSearch, WebFetch, Read, Write, Grep
- **Format**: Markdown with YAML frontmatter

## 📈 Roadmap

### Phase 1 ✅ (Completed)
- [x] Agent architecture (research, SEO, marketing)
- [x] Slash commands (`/blog-generate`, `/blog-research`, `/blog-seo`, `/blog-marketing`)
- [x] Context optimization (file-based handoffs)
- [x] User checkpoints between phases
- [x] Claude Code plugin marketplace integration

### Phase 2 (Next)
- [ ] Additional agents (Copywriter, Editor, Translator)
- [ ] Custom agent templates
- [ ] Multi-language support
- [ ] Analytics integration (track article performance)
- [ ] CMS integrations (Notion, Contentful, WordPress)

### Phase 3 (Future)
- [ ] Agent plugin system (community agents)
- [ ] Real-time collaboration
- [ ] Visual workflow builder
- [ ] Agent marketplace
- [ ] API access

## 🎓 Best Practices

### 1. Be Specific with Topics

✅ **Good**: "Implementing distributed tracing in Node.js with OpenTelemetry"
❌ **Bad**: "Distributed tracing"

**Why**: Specific topics yield better research and more focused articles.

### 2. Review Checkpoints

Don't skip checkpoint reviews:
- After research: Verify quality and coverage
- After SEO: Approve keywords and structure
- After marketing: Review final article

**Why**: Early feedback saves time and improves quality.

### 3. Use Individual Commands for Iterations

```bash
# Regenerate research with different focus
/blog-research "topic"
# (Provide specific guidance)

# Try different SEO angle
/blog-seo "topic"
# (Specify new primary keyword)

# Rewrite with different tone
/blog-marketing "topic"
# (Request changes to specific sections)
```

**Why**: Faster than re-running entire workflow.

### 4. Clear Between Articles

```bash
# After completing article
/clear

# Start next article
/blog-generate "New topic"
```

**Why**: Each article is independent. No context carryover needed.

## 🤝 Contributing

Contributions welcome! Ideas for contributions:

- New specialized agents (Editor, Translator, Fact-Checker)
- Additional slash commands
- Integration examples (CMS, analytics)
- Documentation improvements
- Bug reports and feature requests

## 📄 License

MIT

---

**Inspired by**: [spec-kit](https://github.com/github/spec-kit) by GitHub

**Philosophy**: "Burn tokens in specialized workers, preserve focus in main thread"

**Built for**: Claude Code users who want AI-powered blog generation with optimized context management
