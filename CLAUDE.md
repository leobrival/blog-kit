# CLAUDE.md

Instructions for Claude Code when working with the Blog-Kit project.

## Project Overview

**Blog-Kit** is an AI-optimized blog article generation toolkit using specialized Claude Code agents for comprehensive, SEO-optimized content creation.

**Core Philosophy**: "Burn tokens in specialized workers, preserve focus in main thread"

## Architecture

### Three Specialized Agents

1. **research-intelligence** (`agents/research-intelligence.md`)
   - Deep research with 5-7 credible sources
   - Cross-references findings
   - Outputs: `.specify/research/[topic]-research.md` (~5k tokens)

2. **seo-specialist** (`agents/seo-specialist.md`)
   - Keyword analysis and search intent
   - Content structure design (H2/H3 outline)
   - Outputs: `.specify/seo/[topic]-seo-brief.md` (~2k tokens)

3. **marketing-specialist** (`agents/marketing-specialist.md`)
   - Engaging content with CTAs
   - Social proof integration
   - Outputs: `articles/[topic].md` (final article)

### Workflow Commands

- **`/blog-generate "topic"`** - Full workflow (Research → SEO → Marketing)
- **`/blog-research "topic"`** - Research phase only
- **`/blog-seo "topic"`** - SEO optimization phase only
- **`/blog-marketing "topic"`** - Content creation phase only

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

**Expected Flow**:
1. Create `research-intelligence` subagent → outputs research report
2. User checkpoint: Verify research quality
3. Create `seo-specialist` subagent → outputs SEO brief
4. User checkpoint: Approve keywords and structure
5. Create `marketing-specialist` subagent → outputs final article
6. User checkpoint: Review and finalize

**Duration**: 30-45 minutes
**Token Usage**: ~200k (agents) + <1k (main thread)

### Individual Phases

For iterating on specific parts:

```bash
/blog-research "topic"    # Redo research
/blog-seo "topic"         # Regenerate SEO brief
/blog-marketing "topic"   # Rewrite article
```

## File Structure

```
blog-kit/
├── .claude-plugin/          # Plugin metadata
│   ├── plugin.json
│   └── marketplace.json
├── commands/                # Slash commands
│   ├── blog-generate.md    # Orchestrator
│   ├── blog-research.md
│   ├── blog-seo.md
│   └── blog-marketing.md
├── agents/                  # Subagent definitions
│   ├── research-intelligence.md
│   ├── seo-specialist.md
│   └── marketing-specialist.md
├── .specify/                # Generated artifacts (gitignored)
│   ├── research/
│   └── seo/
├── articles/                # Generated articles (gitignored)
├── CLAUDE.md               # This file
└── README.md               # User documentation
```

## Output Locations

All generated files use sanitized topic names:
- Convert to lowercase
- Replace spaces with hyphens
- Remove special characters
- Example: "Node.js Tracing" → "nodejs-tracing"

**Research reports**: `.specify/research/[sanitized-topic]-research.md`
**SEO briefs**: `.specify/seo/[sanitized-topic]-seo-brief.md`
**Final articles**: `articles/[sanitized-topic].md`

## Agent Communication

**File-Based Handoffs** (not context passing):

```
Research Agent
  ↓ (saves to file)
.specify/research/[topic]-research.md
  ↓ (SEO agent reads file)
SEO Agent
  ↓ (saves to file)
.specify/seo/[topic]-seo-brief.md
  ↓ (Marketing agent reads both files)
Marketing Agent
  ↓ (saves to file)
articles/[topic].md
```

**Why File-Based**:
- Each agent starts with fresh context (no pollution)
- Main thread never accumulates context
- Agents can process unlimited data in isolation
- Explicit input/output contracts

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

### Generate New Article

```bash
/blog-generate "Best practices for microservices logging"
```

### Update Existing Research

```bash
/blog-research "microservices-logging"
```

### Change SEO Angle

```bash
/blog-seo "microservices-logging"
# (After user provides new direction)
```

### Rewrite Article Section

```bash
/blog-marketing "microservices-logging"
# (With specific feedback on what to change)
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
