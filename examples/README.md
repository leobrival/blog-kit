# Blog Kit Examples

Example configurations and usage patterns for Blog Kit.

## Blog Constitution Example

[`blog.spec.example.json`](./blog.spec.example.json) - Example blog constitution with brand rules.

### How to Use

1. **Copy the example**:
   ```bash
   mkdir -p .spec
   cp examples/blog.spec.example.json .spec/blog.spec.json
   ```

2. **Customize for your blog**:
   - Update `blog.name` with your blog name
   - Adjust `blog.context` to describe your audience
   - Define `blog.objective` (leads, education, awareness, etc.)
   - Choose `blog.tone`:
     - `expert` - Technical, authoritative
     - `pédagogique` - Educational, patient
     - `convivial` - Friendly, casual
     - `corporate` - Professional, formal
   - Set `blog.content_directory` (default: `"articles"`):
     - `"articles"` - Standard directory name
     - `"content"` - Alternative for Hugo/Gatsby projects
     - `"posts"` - Common for Jekyll/WordPress
     - Or any custom directory name
   - Configure `blog.languages` - Supported languages (e.g., `["en", "fr"]`)
   - Customize `brand_rules.voice_do` - What your content should be
   - Customize `brand_rules.voice_dont` - What to avoid

3. **Agents will automatically apply your rules**:
   - Research agent checks constitution before starting
   - SEO agent applies brand guidelines
   - Marketing agent enforces voice rules

### Constitution Structure

```json
{
  "version": "1.0.0",
  "blog": {
    "name": "Your Blog Name",
    "context": "Who is this for?",
    "objective": "What's the goal?",
    "tone": "expert|pédagogique|convivial|corporate",
    "languages": ["en", "fr"],
    "content_directory": "articles",
    "brand_rules": {
      "voice_do": [
        "Guideline 1",
        "Guideline 2"
      ],
      "voice_dont": [
        "Anti-pattern 1",
        "Anti-pattern 2"
      ]
    }
  },
  "workflow": {
    "review_rules": {
      "must_have": [
        "Required element 1",
        "Required element 2"
      ],
      "must_avoid": [
        "Forbidden pattern 1",
        "Forbidden pattern 2"
      ]
    }
  }
}
```

## Quick Setup

Instead of manually creating the constitution, use the interactive wizard:

```bash
/blog-setup
```

This will guide you through the configuration process and create `.spec/blog.spec.json` automatically.

## Content Directory Configuration

The `content_directory` field allows you to customize where articles are stored:

```json
{
  "blog": {
    "content_directory": "articles"  // Default
  }
}
```

**Common configurations**:

- **`"articles"`** (default) - Standard Blog Kit structure
  ```
  articles/
  ├── en/
  ├── fr/
  └── es/
  ```

- **`"content"`** - For Hugo, Gatsby, or Astro projects
  ```
  content/
  ├── en/
  ├── fr/
  └── es/
  ```

- **`"posts"`** - For Jekyll, WordPress, or traditional blogs
  ```
  posts/
  ├── en/
  ├── fr/
  └── es/
  ```

- **Custom** - Any directory name you prefer
  ```json
  {
    "blog": {
      "content_directory": "blog-posts"
    }
  }
  ```

**Important**: All agents will respect this configuration. When you run commands like `/blog-translate`, the validation scripts automatically read this field and scan the correct directory.

## Validation

Validate your constitution before using it:

```bash
bash scripts/validate-constitution.sh
```

This checks:
- ✅ File exists at `.spec/blog.spec.json`
- ✅ Valid JSON syntax
- ✅ Required fields present (`blog.name`, `blog.context`, `blog.tone`)
- ✅ Content directory is valid (if specified)

## Examples of Good Brand Rules

### Technical Blog (Expert Tone)

```json
{
  "tone": "expert",
  "brand_rules": {
    "voice_do": [
      "Precise technical terminology",
      "Link to official documentation",
      "Include code examples",
      "Reference benchmarks and metrics"
    ],
    "voice_dont": [
      "Oversimplify complex concepts",
      "Use marketing buzzwords",
      "Make claims without data"
    ]
  }
}
```

### Educational Blog (Pédagogique Tone)

```json
{
  "tone": "pédagogique",
  "brand_rules": {
    "voice_do": [
      "Step-by-step explanations",
      "Visual diagrams and examples",
      "Analogies for complex topics",
      "Clear learning objectives"
    ],
    "voice_dont": [
      "Assume prior knowledge",
      "Use jargon without explanation",
      "Skip fundamental concepts"
    ]
  }
}
```

### Business Blog (Corporate Tone)

```json
{
  "tone": "corporate",
  "brand_rules": {
    "voice_do": [
      "Professional language",
      "ROI and business value focus",
      "Case studies and testimonials",
      "Industry best practices"
    ],
    "voice_dont": [
      "Casual or informal language",
      "Unsubstantiated claims",
      "Overly technical details"
    ]
  }
}
```

## Testing Your Constitution

After creating your constitution, test it by generating an article:

```bash
/blog-generate "Test Topic: Best practices for microservices"
```

Review the generated content to ensure:
- Tone matches your specification
- Voice guidelines are followed
- Review rules are applied

If adjustments are needed, edit `.spec/blog.spec.json` and regenerate.

---

**Tip**: Start with the example, customize gradually, and iterate based on actual output quality.
