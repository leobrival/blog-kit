# Blog Research

Execute comprehensive research for blog article topic using the Research Intelligence specialist agent.

## Usage

```bash
/blog-research "Your article topic"
```

**Example**:
```bash
/blog-research "Implementing distributed tracing in Node.js with OpenTelemetry"
```

## What This Command Does

Delegates to the **research-intelligence** subagent to conduct deep, multi-source research:

- Decomposes topic into 3-5 sub-questions
- Executes 5-7 targeted web searches
- Evaluates sources for credibility and relevance
- Cross-references findings
- Generates comprehensive research report with citations

**Time**: 15-20 minutes
**Output**: `.specify/research/[topic]-research.md`

## Instructions

Create a new subagent conversation with the `research-intelligence` agent.

**Provide the following prompt**:

```
You are conducting deep research on the following topic for a blog article:

**Topic**: $ARGUMENTS

Follow your Three-Phase Process as documented in your agent instructions:

1. **Strategic Planning** (5-10 min):
   - Decompose the topic into sub-questions
   - Plan source strategy
   - Define success criteria

2. **Autonomous Retrieval** (10-20 min):
   - Execute targeted searches
   - Evaluate and fetch sources
   - Cross-reference findings
   - Apply quality filters

3. **Synthesis** (5-10 min):
   - Generate structured research report
   - Include executive summary
   - Document key findings with citations
   - Note contradictions/debates
   - Provide actionable insights

**Output Location**: Save your final report to `.specify/research/[SANITIZED-TOPIC]-research.md`

**Sanitization Rules**:
- Convert to lowercase
- Replace spaces with hyphens
- Remove special characters
- Example: "Node.js Tracing" → "nodejs-tracing"

Begin your research now.
```

## Expected Output

After completion, verify that `.specify/research/[topic]-research.md` exists and contains:

✅ Executive summary with key takeaways
✅ Findings organized by sub-questions
✅ Minimum 5-7 credible sources cited
✅ Evidence with proper attribution
✅ Contradictions or debates (if any)
✅ Actionable insights (3-5 points)
✅ References section with full citations

## Next Steps

After research completes:

1. **Review the report**: Check quality and coverage
2. **Proceed to SEO**: Run `/blog-seo` to create content brief
3. **Or continue full workflow**: If this was part of `/blog-generate`, the orchestrator will proceed automatically

## When to Use This Command

Use `/blog-research` when you need to:

- ✅ Redo research with different focus
- ✅ Update research with newer sources
- ✅ Add depth to existing research
- ✅ Research only (without SEO/writing)

**For full workflow**: Use `/blog-generate` instead.

## Tips

1. **Be specific**: Detailed topics yield better research
2. **Check sources**: Review citations for quality
3. **Verify recency**: Ensure sources are recent (if topic is current)
4. **Note gaps**: If research misses something, you can request follow-up

## Error Handling

If research fails:
- Check if topic is clear and researchable
- Verify web search is available
- Try narrowing or broadening the topic
- Check `.specify/research/` directory exists

---

**Ready to start?** Provide your topic above and execute this command.
