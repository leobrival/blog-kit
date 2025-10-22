# Personas Directory

This directory contains audience persona definitions for blog content targeting and strategy.

## What are Personas?

Personas are detailed, behaviorally-validated profiles of your target audience. Unlike traditional demographics-based personas, these are built using proven frameworks:

- **Jobs-to-be-Done**: Why customers "hire" your content
- **Forces of Progress**: Push/Pull/Anxiety/Habit dynamics
- **Customer Awareness**: 5 stages (Unaware → Most Aware)
- **30 Elements of Value**: What matters most to them

## Directory Structure

```
.spec/personas/
├── README.md                           # This file
├── schema.json                         # JSON Schema for validation
├── registry.json                       # Catalog of all personas
├── example-developer-freelance.json    # Example persona (Alex Chen)
└── [your-personas].json                # Your custom personas
```

## File Formats

### schema.json

JSON Schema defining the structure and validation rules for persona files. Contains:
- 12 required dimensions
- Enum validations for awareness stages, value elements, etc.
- Type checking for all fields

**Don't modify** unless extending the persona structure.

### registry.json

Catalog of all personas with quick reference metadata:

```json
{
  "version": "1.0.0",
  "personas": [
    {
      "id": "developer-freelance",
      "name": "Alex Chen",
      "file": "example-developer-freelance.json",
      "awareness_stage": "solution-aware",
      "primary_value": "saves-time",
      "target_funnel": ["MOFU", "BOFU"],
      "confidence": "85%",
      "validated": true,
      "created_at": "2025-10-21"
    }
  ],
  "metadata": {
    "total_personas": 1,
    "validated_count": 1,
    "last_updated": "2025-10-21"
  }
}
```

**Auto-updated** by `/blog-personas` commands.

### Individual Persona Files

Each persona is a complete JSON file with 12 dimensions:

1. **persona**: Basic profile (name, age, profession, background)
2. **current_situation**: State, feelings, influences, time spent
3. **goals**: Dreams, life change, success vision, aspiration
4. **blockers**: Main blocker, sources, consequences, fears
5. **jobs_to_be_done**: Functional, emotional, social jobs + context
6. **forces_of_progress**: Push, pull, anxiety, habit
7. **awareness_stage**: One of 5 stages with specific moments
8. **value_elements**: Top 5 from 30 Elements of Value
9. **behavioral_patterns**: Real actions, spending, current solution
10. **content_preferences**: Post types, funnel stages, topics, tone
11. **metadata**: Confidence, validation status, evidence source

**Example**: See `example-developer-freelance.json`

## Creating Personas

### Using the Command

```bash
# Create new persona
/blog-personas create "Your Target Audience"

# This will:
# 1. Research behavioral evidence
# 2. Build 12-dimension profile
# 3. Generate persona JSON file
# 4. Update registry.json
# 5. Create targeting report in .specify/personas/
```

### Manual Creation

1. **Copy example**: `cp example-developer-freelance.json your-persona.json`
2. **Edit all fields**: Replace with your persona data
3. **Validate**: Run `/blog-personas validate "your-persona"`
4. **Update registry**: Add entry to `registry.json`

**Important**: Base on behavioral evidence, not assumptions!

## Managing Personas

### List All Personas

```bash
/blog-personas list
```

Shows summary table with key stats.

### Update Existing Persona

```bash
/blog-personas update "persona-id"
```

Interactive update with options:
- Add new behavioral evidence
- Update awareness stage
- Refine content preferences
- Update confidence/validation status

### Validate Persona

```bash
/blog-personas validate "persona-id"
```

Checks:
- JSON schema compliance
- Evidence quality
- Logical consistency
- Content performance (if available)

## Integration with Blog Workflow

### Article Frontmatter

Tag articles with target persona:

```yaml
---
title: "Complete Kubernetes Guide for Freelance Developers"
target_persona: "developer-freelance"
awareness_stage: "solution-aware"
post_type: "actionnable"
funnel_stage: "MOFU"
---
```

### Category Configuration

Link categories to personas in `.category.json`:

```json
{
  "name": "Tutorials",
  "target_personas": ["developer-freelance", "startup-founder"],
  "awareness_stages": ["solution-aware", "product-aware"],
  "post_types": ["actionnable"],
  "funnel_stages": ["MOFU", "BOFU"]
}
```

### Analytics & Validation

Track content performance by persona:

1. Tag articles with `target_persona` in frontmatter
2. Monitor engagement metrics per persona
3. Update persona confidence based on performance
4. Iterate content strategy per persona results

## Persona Quality Guidelines

### Good Personas

- **Specific**: Real names, exact ages, concrete details
- **Behavioral**: Based on what people actually do
- **Validated**: Grounded in interviews, reviews, forums
- **Actionable**: Clear content preferences and targeting

### Poor Personas

- **Generic**: "Tech-savvy millennial professional"
- **Assumption-based**: Made-up without evidence
- **Demographic-only**: Age + location ≠ behavior
- **Vague**: No concrete examples or quotes

## Validation Requirements

For high confidence (80%+), personas should be based on:

- **5-10 customer interviews** (ideal)
- **50+ forum posts analyzed** (Reddit, Quora, etc.)
- **20+ product reviews** (G2, Capterra, TrustPilot)
- **Support tickets** (real problems)
- **User behavior data** (if available)

Minimum for medium confidence (60-79%):
- **3 interviews** OR **30 forum posts** OR **15 reviews**

Below 60% = hypothesis needing validation

## Frameworks Explained

### Jobs-to-be-Done (JTBD)

People don't buy products, they "hire" them to get a job done.

**Example**:
- Functional: "Track project status across 3 client projects"
- Emotional: "Feel in control and reduce anxiety"
- Social: "Appear organized to clients"
- Context: "When switching between client calls"

### Forces of Progress

Four forces determine if someone will change:

**Formula**: `If Push + Pull > Anxiety + Habit → Change happens`

**Example**:
- Push: Lost client due to poor communication (pain)
- Pull: Vision of streamlined workflow (attraction)
- Anxiety: Time to learn new system (hesitation)
- Habit: Current chaotic system feels familiar (inertia)

**Strategy**: Amplify push/pull OR reduce anxiety/habit in content

### Customer Awareness (Eugene Schwartz)

5 stages of awareness journey:

1. **Unaware**: Don't know they have a problem
2. **Problem Aware**: Know problem, not solutions
3. **Solution Aware**: Know solutions exist, researching
4. **Product Aware**: Know your product, evaluating
5. **Most Aware**: Ready to buy, need right offer

**Content Strategy**:
- Unaware: Educational, problem identification
- Problem Aware: Problem deep-dive, empathy
- Solution Aware: Solution comparison, frameworks
- Product Aware: Feature walkthroughs, demos
- Most Aware: Case studies, ROI, pricing

### 30 Elements of Value

Hierarchy of value (like Maslow's hierarchy):

**Functional** (14): saves time, simplifies, makes money, reduces risk, organizes, integrates, connects, reduces effort, avoids problems, reduces cost, quality, variety, sensory appeal, informs

**Emotional** (10): reduces anxiety, rewards, nostalgia, design, badge value, wellness, therapeutic value, fun, attractiveness, provides access

**Life Changing** (5): self-actualization, provides hope, motivation, heirloom, affiliation

**Social Impact** (1): self-transcendence

**Usage**: Select top 5 that matter most to your persona

## Best Practices

### Do

- Start with behavioral evidence (interviews, forums, reviews)
- Be hyper-specific (real names, exact details, concrete examples)
- Focus on jobs-to-be-done (why they hire content)
- Map forces of progress (what drives/blocks change)
- Match awareness stage to content strategy
- Validate continuously (track performance, update based on data)

### Don't

- Create personas without talking to real people
- Use vague language ("some", "many", "often")
- Rely on demographics alone (age + job title ≠ behavior)
- Make up statistics or data
- Skip validation (always have evidence)
- Create too many personas (3-5 is ideal)

## Common Mistakes

### "We have 20 personas"

**Problem**: Too many = not actionable
**Solution**: Focus on 3-5 primary personas, combine similar ones

### "Our persona is 'busy professionals aged 30-45'"

**Problem**: Demographics ≠ behavior
**Solution**: Define by job-to-be-done and behavior patterns

### "Based on internal assumptions"

**Problem**: No behavioral evidence
**Solution**: Interview 5-10 people minimum, analyze forums/reviews

### "All fields are vague or generic"

**Problem**: Not actionable
**Solution**: Use real quotes, specific details, concrete examples

## Troubleshooting

### Low Confidence Score

**Cause**: Insufficient behavioral evidence
**Solution**:
- Conduct customer interviews (5-10 minimum)
- Analyze forum discussions (Reddit, Quora)
- Review product reviews (G2, Capterra)
- Check support tickets
- Gather user behavior data

### Content Doesn't Resonate

**Cause**: Mismatch between persona and reality
**Solution**:
- Validate awareness stage assumption
- Check JTBD accuracy (talk to real people)
- Review value elements (what they actually care about)
- Update based on engagement data

### Schema Validation Fails

**Cause**: Invalid JSON structure or enum values
**Solution**:
- Check `schema.json` for requirements
- Validate with: `jq empty persona.json` or `python3 -m json.tool persona.json`
- Common issues: wrong enum values, missing required fields

## Version Control

### Recommended Git Strategy

**Commit**:
- `schema.json` (documentation)
- `example-*.json` (examples for team)
- `README.md` (this file)

**Consider Committing**:
- `registry.json` (team reference)
- Your personas if sharing with team

**Don't Commit**:
- `.specify/personas/` (generated reports - in `.gitignore`)

### Privacy Considerations

If personas contain sensitive customer data:
1. Uncomment `.spec/personas/` in `.gitignore`
2. Share personas via secure channel
3. Or anonymize before committing (change names, details)

## Additional Resources

### Frameworks

- **Jobs-to-be-Done**: "Competing Against Luck" by Clayton Christensen
- **Forces of Progress**: Bob Moesta's Demand-Side Sales
- **Customer Awareness**: "Breakthrough Advertising" by Eugene Schwartz
- **Elements of Value**: Harvard Business Review article by Almquist, Senior, Bloch

### Tools

- **Research**: Reddit, Quora, product review sites (G2, Capterra)
- **Validation**: Customer interviews, user testing
- **Analytics**: Tag articles with `target_persona`, track engagement
- **Updates**: `/blog-personas update` and `/blog-personas validate`

## Support

For questions or issues:

1. Check example: `example-developer-freelance.json`
2. Review command docs: `/blog-personas` in `plugin/commands/`
3. Read agent specs: `plugin/agents/persona-specialist.md`
4. Validate schema: `/blog-personas validate "persona-id"`

---

**Remember**: The best personas are based on real conversations and behavioral data, not assumptions. When in doubt, go talk to actual customers.
