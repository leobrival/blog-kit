# Example Workflow: Complete Article Generation

This document walks through a complete end-to-end workflow for generating a blog article using Blog-Kit.

## Topic

**"Implementing distributed tracing in Node.js with OpenTelemetry"**

A technical guide for developers who want to add observability to their Node.js microservices.

## Step 1: Installation

```bash
# Install Blog-Kit plugin
/plugin marketplace add leobrival/blog-kit
/plugin install blog-kit

# Verify installation
/help
# Should show /blog-generate, /blog-research, /blog-seo, /blog-marketing
```

## Step 2: Initiate Workflow

```bash
/blog-generate "Implementing distributed tracing in Node.js with OpenTelemetry"
```

### What Happens

Claude Code reads `commands/blog-generate.md` and begins orchestration.

**Output**:
```
Starting blog article generation workflow...

Topic: Implementing distributed tracing in Node.js with OpenTelemetry
Estimated time: 30-45 minutes

Phase 1: Deep Research (15-20 min)
Phase 2: SEO Optimization (5-10 min)
Phase 3: Content Creation (10-15 min)

Let's begin!
```

---

## Phase 1: Research (15-20 minutes)

### Agent Spawned

**research-intelligence** subagent is created with isolated context.

### Agent Process

**Strategic Planning (5 min)**:
- Decomposes topic into sub-questions:
  1. What is distributed tracing?
  2. What is OpenTelemetry?
  3. How to implement in Node.js?
  4. What are best practices?
  5. What are common pitfalls?

**Autonomous Retrieval (10 min)**:
- Executes 7 web searches:
  * "distributed tracing explained"
  * "OpenTelemetry documentation"
  * "OpenTelemetry Node.js tutorial"
  * "distributed tracing best practices"
  * "OpenTelemetry vs Jaeger"
  * "Node.js tracing implementation guide"
  * "production tracing challenges"

- Fetches and evaluates 12 sources, selects top 7:
  1. OpenTelemetry Official Documentation
  2. Honeycomb: Introduction to Distributed Tracing
  3. Lightstep: Distributed Tracing 101
  4. Node.js OpenTelemetry SDK Guide
  5. Real-world implementation blog (company case study)
  6. Best practices article (industry expert)
  7. Performance considerations whitepaper

**Synthesis (5 min)**:
- Generates structured research report
- Includes executive summary
- Organizes findings by sub-questions
- Cites all sources with URLs
- Notes debate: manual instrumentation vs auto-instrumentation

### Output

**File**: `.specify/research/implementing-distributed-tracing-nodejs-opentelemetry-research.md`

**Size**: ~5,000 tokens

**Content Preview**:
```markdown
# Deep Research Report: Implementing Distributed Tracing in Node.js with OpenTelemetry

**Generated**: 2025-10-11
**Sources Analyzed**: 7 sources
**Confidence Level**: High

## Executive Summary

Distributed tracing enables developers to track requests across microservices,
identifying performance bottlenecks and debugging complex interactions.
OpenTelemetry is the industry-standard observability framework, providing
vendor-neutral instrumentation for Node.js applications. Implementation involves
installing the SDK, configuring exporters, and instrumenting key operations.
Best practices emphasize starting with auto-instrumentation before adding custom
spans, sampling strategically to control costs, and correlating traces with logs
and metrics.

**Key Takeaways**:
1. OpenTelemetry unifies tracing, metrics, and logging with vendor-neutral APIs
2. Auto-instrumentation covers 80% of use cases with minimal code changes
3. Strategic sampling is critical for production deployments (cost vs visibility)

## Findings

### What is Distributed Tracing?

**Summary**: Distributed tracing tracks requests as they flow through multiple
services, creating a visual timeline of operations (spans) grouped into traces.

**Evidence**:
1. **Definition and Purpose**: Tracing provides end-to-end visibility into request
   flow, helping identify latency sources and failure points.
   - Source: Honeycomb, 2023
   - URL: [link]

[... continues for 5k tokens ...]
```

### Checkpoint 1

**Claude Code displays**:
```
✅ Research phase complete!

Research report saved to:
.specify/research/implementing-distributed-tracing-nodejs-opentelemetry-research.md

Key findings:
- 7 credible sources analyzed
- Coverage: definition, implementation, best practices, common pitfalls
- Debate noted: manual vs auto-instrumentation approaches

Would you like to:
1. Review the research report before proceeding?
2. Continue to SEO phase?
3. Regenerate research with different focus?

Your choice: _
```

**User Response**: "2" (Continue)

---

## Phase 2: SEO Optimization (5-10 minutes)

### Agent Spawned

**seo-specialist** subagent is created with fresh isolated context.

### Agent Process

**Keyword Analysis (3 min)**:
- Reads research report (5k tokens input)
- Extracts keyword candidates:
  * distributed tracing
  * OpenTelemetry
  * Node.js tracing
  * observability
  * microservices monitoring
  * etc. (15 total)
- Validates with WebSearch
- Selects keywords:
  * **Primary**: "opentelemetry nodejs"
  * **Secondary**: "distributed tracing nodejs", "nodejs observability", "microservices tracing"
  * **LSI**: spans, traces, exporters, instrumentation, telemetry data

**Search Intent (2 min)**:
- Searches "opentelemetry nodejs"
- Reviews top 5 results:
  1. Official docs (tutorial)
  2. Tutorial blog (step-by-step guide)
  3. Example repo (code samples)
  4. Conference talk summary
  5. Comparison article (vs alternatives)
- **Intent**: Informational (users want to learn implementation)
- **Format**: Tutorial/Guide (step-by-step with code examples)

**Content Structure (4 min)**:
- Creates 7 headline options:
  1. "Complete Guide to Distributed Tracing in Node.js with OpenTelemetry"
  2. "Implementing OpenTelemetry in Node.js: A Step-by-Step Guide"
  3. "How to Add Distributed Tracing to Your Node.js Microservices"
  4. "OpenTelemetry + Node.js: Your First Distributed Tracing Setup"
  5. "Mastering Observability: Distributed Tracing with OpenTelemetry in Node.js"
  6. "Node.js Distributed Tracing Made Simple with OpenTelemetry"
  7. "The Developer's Guide to OpenTelemetry Tracing in Node.js"
- **Recommended**: #2 (clear, action-oriented, includes primary keyword)

- Designs H2/H3 structure:
  * Introduction
  * What is Distributed Tracing?
  * Why OpenTelemetry?
  * Setting Up Your Node.js Project
    - Installing Dependencies
    - Basic Configuration
  * Auto-Instrumentation vs Manual Instrumentation
  * Implementing Your First Trace
    - Creating Custom Spans
    - Adding Attributes
  * Best Practices for Production
    - Sampling Strategies
    - Performance Considerations
  * Common Pitfalls and Troubleshooting
  * FAQ
  * Conclusion

**SEO Recommendations (1 min)**:
- Target length: 2,500 words
- Keyword density: 1.5% (primary)
- Images: 5-7 (architecture diagram, code screenshots, trace visualization)
- Schema: HowTo + Article
- Featured snippet: "How to set up OpenTelemetry in Node.js" (concise steps)

### Output

**File**: `.specify/seo/implementing-distributed-tracing-nodejs-opentelemetry-seo-brief.md`

**Size**: ~2,000 tokens

**Content Preview**:
```markdown
# SEO Content Brief: Implementing Distributed Tracing in Node.js with OpenTelemetry

**Generated**: 2025-10-11
**Research Report**: .specify/research/implementing-distributed-tracing-nodejs-opentelemetry-research.md

## Target Keywords

**Primary**: opentelemetry nodejs (~45,000 search results)
**Secondary**:
- distributed tracing nodejs
- nodejs observability
- microservices tracing
- node.js monitoring

**LSI Keywords**: spans, traces, exporters, instrumentation, telemetry data,
auto-instrumentation, manual instrumentation, sampling

## Search Intent

**Type**: Informational

**User Goal**: Learn how to implement distributed tracing in their Node.js
applications using OpenTelemetry

**Recommended Format**: Step-by-Step Tutorial with Code Examples

## Headline Options

1. Complete Guide to Distributed Tracing in Node.js with OpenTelemetry
2. **Implementing OpenTelemetry in Node.js: A Step-by-Step Guide** ← Recommended
3. How to Add Distributed Tracing to Your Node.js Microservices
[... continues ...]

**Recommended**: #2 - Clear action-oriented headline with primary keyword naturally included

[... continues for 2k tokens ...]
```

### Checkpoint 2

**Claude Code displays**:
```
✅ SEO phase complete!

SEO brief saved to:
.specify/seo/implementing-distributed-tracing-nodejs-opentelemetry-seo-brief.md

Key elements:
- Primary keyword: "opentelemetry nodejs"
- Headline: "Implementing OpenTelemetry in Node.js: A Step-by-Step Guide"
- Structure: 10 main sections with 2-4 subsections each
- Target length: 2,500 words
- Format: Tutorial with code examples

Would you like to:
1. Review the SEO brief?
2. Request changes to headline or structure?
3. Continue to content creation?

Your choice: _
```

**User Response**: "1" (Review)

**Claude Code**: "Opening SEO brief..."

*(User reviews and approves)*

**User**: "3" (Continue)

---

## Phase 3: Content Creation (10-15 minutes)

### Agent Spawned

**marketing-specialist** subagent is created with fresh isolated context.

### Agent Process

**Context Loading (3 min)**:
- Reads research report (token-efficiently):
  * ✅ Executive summary
  * ✅ Key findings (top 5)
  * ✅ Best quotes from sources
  * ✅ Top 7 source citations
  * ❌ Skips full evidence logs (saves ~3k tokens)

- Reads SEO brief (token-efficiently):
  * ✅ Target keywords
  * ✅ Chosen headline
  * ✅ H2/H3 structure
  * ✅ Meta description
  * ❌ Skips competitor analysis details (saves ~1k tokens)

**Total input**: ~1,500 tokens (vs 7,000+ if loading everything)

**Content Creation (25 min)**:

**Introduction (150 words)**:
- Hook: "When a single API request spans 5 microservices and takes 3 seconds to complete, where's the bottleneck?"
- Promise: Learn to implement OpenTelemetry tracing in Node.js
- Credibility: "After analyzing 7 authoritative sources..."

**Body Sections** (following SEO structure):
- **What is Distributed Tracing?** (300 words)
  * Definition with analogy
  * Visual description of traces and spans
  * Why it matters for microservices
- **Why OpenTelemetry?** (250 words)
  * Industry standard
  * Vendor-neutral
  * Active community
- **Setting Up Your Node.js Project** (400 words)
  * Prerequisites
  * Installing dependencies (code block)
  * Basic configuration (code block)
- **Auto-Instrumentation vs Manual** (300 words)
  * Comparison table
  * When to use each
  * Pros/cons
- **Implementing Your First Trace** (500 words)
  * Step-by-step with code examples
  * Creating custom spans
  * Adding attributes and events
- **Best Practices for Production** (400 words)
  * Sampling strategies (with stats from research)
  * Performance considerations
  * Security and PII handling
- **Common Pitfalls** (300 words)
  * Issue 1: Over-instrumentation
  * Issue 2: Context propagation failures
  * Issue 3: Sampling too aggressively
- **FAQ** (300 words)
  * 5 common questions with concise answers

**Social Proof Integration**:
- "According to OpenTelemetry documentation, auto-instrumentation covers 80% of use cases"
- "A Honeycomb study found that teams with distributed tracing resolve incidents 50% faster"
- Real-world example from research (case study reference)

**CTA Placement**:
1. After introduction: "Download our free OpenTelemetry setup checklist →"
2. Mid-article (after implementation section): "Want to see this in action? Check out our example repository →"
3. Conclusion: "Ready to add observability to your services? Start with our starter template →"

**FAQ Section**:
```markdown
### What's the difference between tracing and logging?

Tracing tracks requests across services with causality relationships, while
logging captures discrete events. Tracing shows *flow*, logging shows *what happened*.

### Does OpenTelemetry impact performance?

With proper sampling (1-10% in production), overhead is typically <5% latency increase.
Auto-instrumentation adds minimal overhead compared to manual approaches.

[... 3 more FAQs ...]
```

**Conclusion**:
- Summary (3 key takeaways as bullets)
- Reinforce main message
- Strong final CTA

**Polish (5 min)**:
- Readability: Varied sentence length, short paragraphs
- Engagement: Questions, "you/your", concrete examples
- SEO: Primary keyword in H1, intro, 2 H2s, meta
- Conversion: CTAs natural and valuable

### Output

**File**: `articles/implementing-distributed-tracing-nodejs-opentelemetry.md`

**Size**: ~3,500 tokens (~2,600 words)

**Content Preview**:
```markdown
---
title: "Implementing OpenTelemetry in Node.js: A Step-by-Step Guide"
description: "Learn how to add distributed tracing to your Node.js microservices with OpenTelemetry. Complete guide with code examples, best practices, and troubleshooting tips."
keywords: "opentelemetry nodejs, distributed tracing nodejs, nodejs observability, microservices tracing"
author: "Blog Kit Team"
date: "2025-10-11"
readingTime: "12 min"
category: "Technical"
tags: ["OpenTelemetry", "Node.js", "Distributed Tracing", "Observability", "Microservices"]
seo:
  schema: "HowTo, Article"
---

# Implementing OpenTelemetry in Node.js: A Step-by-Step Guide

When a single API request spans 5 microservices and takes 3 seconds to complete,
where's the bottleneck? Without distributed tracing, you're debugging blindfolded.
This guide shows you how to implement OpenTelemetry tracing in Node.js, giving you
end-to-end visibility into your microservices architecture.

After analyzing 7 authoritative sources—from official OpenTelemetry documentation
to real-world production implementations—here's everything you need to know to get
started. You'll learn how to set up your first trace, understand auto vs manual
instrumentation, and avoid common pitfalls that trip up teams in production.

**Download our free [OpenTelemetry Setup Checklist →](https://example.com/checklist)**

## What is Distributed Tracing?

[... continues for 2,600 words ...]

## Conclusion

Implementing distributed tracing with OpenTelemetry in Node.js doesn't have to be
complex. Start with these key takeaways:

* **Use auto-instrumentation first**: Covers 80% of use cases with minimal setup
* **Sample strategically**: 1-10% sampling balances visibility with cost
* **Correlate signals**: Combine traces with logs and metrics for full observability

OpenTelemetry is now the industry standard, with vendor-neutral APIs that prevent
lock-in. Whether you're debugging latency issues or optimizing microservices
architecture, distributed tracing gives you the visibility you need.

**Ready to add observability to your services? [Start with our starter template →](https://example.com/starter)**

---

## Sources & References

1. OpenTelemetry. "Getting Started with OpenTelemetry Node.js." OpenTelemetry Docs, 2023. [URL]
2. Honeycomb. "Introduction to Distributed Tracing." Honeycomb Blog, 2023. [URL]
[... 5 more sources ...]

---

## Internal Linking Opportunities

- **Node.js Performance Monitoring** → Related article on metrics collection
- **Microservices Architecture Guide** → Related article on service design
- **Production Debugging Strategies** → Related article on observability

---

## Article Metrics

- **Word Count**: 2,610 words
- **Reading Time**: ~12 minutes
- **Primary Keyword**: "opentelemetry nodejs"
- **Target Audience**: Node.js developers building microservices
- **Search Intent**: Informational (tutorial/guide)
```

### Checkpoint 3

**Claude Code displays**:
```
✅ Content creation complete!

Final article saved to:
articles/implementing-distributed-tracing-nodejs-opentelemetry.md

Article metrics:
- Word count: 2,610 words
- Reading time: ~12 minutes
- Primary keyword: "opentelemetry nodejs" (1.5% density)
- Secondary keywords: Naturally integrated
- CTAs: 3 strategically placed
- Sources: 7 cited
- Quality: Professional, actionable, engaging

Would you like to:
1. Review the full article?
2. Request revisions to specific sections?
3. Finalize and publish?

Your choice: _
```

**User Response**: "1" (Review)

*(User reviews article)*

**User**: "Can you make the introduction more engaging? Maybe start with a real-world scenario."

**Claude Code**: "I'll regenerate the introduction with a more engaging real-world scenario."

*(Spawns marketing agent again with specific feedback)*

**Updated Introduction**:
```markdown
# Implementing OpenTelemetry in Node.js: A Step-by-Step Guide

Picture this: It's 2 AM. Your payment service is timing out. Users are complaining.
You check your logs—everything looks normal. Your metrics show CPU and memory are fine.
But somewhere in your 7-microservice chain, a request is dying, and you have no idea where.

This is the nightmare of distributed systems without tracing. And this is exactly why
you need OpenTelemetry.

Distributed tracing tracks requests as they flow through your microservices, creating
a visual timeline that shows exactly where time is spent—and where things go wrong.
OpenTelemetry, the industry-standard observability framework, makes implementing
tracing in Node.js straightforward and vendor-neutral.

[... continues ...]
```

**User**: "Perfect! Let's finalize."

---

## Final Output

After 40 minutes, you have:

### 1. Research Report
**File**: `.specify/research/implementing-distributed-tracing-nodejs-opentelemetry-research.md`
- 7 credible sources
- 5,000 tokens
- Comprehensive findings
- Actionable insights

### 2. SEO Brief
**File**: `.specify/seo/implementing-distributed-tracing-nodejs-opentelemetry-seo-brief.md`
- Keyword analysis
- Content structure
- 2,000 tokens
- SEO recommendations

### 3. Final Article
**File**: `articles/implementing-distributed-tracing-nodejs-opentelemetry.md`
- 2,610 words
- SEO-optimized
- Engaging and actionable
- 3 CTAs, 7 sources
- Ready to publish

## Token Usage Summary

| Phase | Agent Tokens | Main Thread Tokens |
|-------|--------------|-------------------|
| Research | ~150,000 | ~200 |
| SEO | ~20,000 | ~150 |
| Marketing | ~35,000 | ~180 |
| Revision | ~8,000 | ~100 |
| **Total** | **~213,000** | **~630** |

**Context Efficiency**: 99.7%

---

## Next Steps

1. Copy article to your CMS
2. Add relevant images (architecture diagrams, code screenshots)
3. Optimize images with alt text
4. Publish and promote
5. Track performance (traffic, rankings, engagement)

---

## Session Cleanup

```bash
# Clear context for next article
/clear

# Generate next article
/blog-generate "Next topic here"
```

---

## Key Takeaways from This Workflow

✅ **Agent Isolation Works**: Each agent processed 50k-150k tokens without affecting main thread
✅ **User Checkpoints Matter**: Early feedback improved final quality
✅ **File-Based Handoffs Scale**: Clean separation between phases
✅ **Iteration is Easy**: Regenerated introduction without restarting workflow
✅ **Context Stays Clean**: Main thread used <1k tokens for entire 40-minute workflow

This is the power of Blog-Kit's context-optimized architecture.
