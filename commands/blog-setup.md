# Blog Setup

Interactive setup wizard to create blog constitution (`.spec/blog.spec.json`).

## Usage

```bash
/blog-setup
```

This command creates a bash script in `/tmp/` and executes it interactively to gather your blog configuration.

## What It Does

1. Generates interactive setup script in `/tmp/blog-kit-setup-[timestamp].sh`
2. Prompts for blog configuration (name, context, tone, voice rules)
3. Creates `.spec/blog.spec.json` with your configuration
4. Validates JSON structure
5. Cleans up temporary script

## Instructions

Generate and execute the following bash script:

```bash
# Generate unique script name
SCRIPT="/tmp/blog-kit-setup-$(date +%s).sh"

# Create interactive setup script
cat > "$SCRIPT" <<'SCRIPT_EOF'
#!/bin/bash

# Blog Kit Setup Wizard
# ======================

clear
echo "╔════════════════════════════════════════╗"
echo "║     Blog Kit - Setup Wizard            ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "This wizard will create .spec/blog.spec.json"
echo "with your blog configuration."
echo ""

# Prompt: Blog Name
echo "📝 Blog Configuration"
echo "─────────────────────"
read -p "Blog name: " blog_name

# Validate non-empty
while [ -z "$blog_name" ]; do
  echo "❌ Blog name cannot be empty"
  read -p "Blog name: " blog_name
done

# Prompt: Context
echo ""
read -p "Context (e.g., 'Tech blog for developers'): " context
while [ -z "$context" ]; do
  echo "❌ Context cannot be empty"
  read -p "Context: " context
done

# Prompt: Objective
echo ""
read -p "Objective (e.g., 'Generate qualified leads'): " objective
while [ -z "$objective" ]; do
  echo "❌ Objective cannot be empty"
  read -p "Objective: " objective
done

# Prompt: Tone
echo ""
echo "🎨 Select tone:"
echo "  1) Expert (technical, authoritative)"
echo "  2) Pédagogique (educational, patient)"
echo "  3) Convivial (friendly, casual)"
echo "  4) Corporate (professional, formal)"
read -p "Choice (1-4): " tone_choice

case $tone_choice in
  1) tone="expert" ;;
  2) tone="pédagogique" ;;
  3) tone="convivial" ;;
  4) tone="corporate" ;;
  *)
    echo "⚠️  Invalid choice, defaulting to 'pédagogique'"
    tone="pédagogique"
    ;;
esac

# Prompt: Languages
echo ""
read -p "Languages (comma-separated, e.g., 'fr,en'): " languages
languages=${languages:-"fr"}  # Default to fr if empty

# Prompt: Voice DO
echo ""
echo "✅ Voice guidelines - DO"
echo "What should your content be?"
echo "Examples: Clear, Actionable, Engaging, Technical, Data-driven"
read -p "DO (comma-separated): " voice_do
while [ -z "$voice_do" ]; do
  echo "❌ Please provide at least one DO guideline"
  read -p "DO (comma-separated): " voice_do
done

# Prompt: Voice DON'T
echo ""
echo "❌ Voice guidelines - DON'T"
echo "What should your content avoid?"
echo "Examples: Jargon, Vague claims, Salesy language, Passive voice"
read -p "DON'T (comma-separated): " voice_dont
while [ -z "$voice_dont" ]; do
  echo "❌ Please provide at least one DON'T guideline"
  read -p "DON'T (comma-separated): " voice_dont
done

# Generate JSON
echo ""
echo "📄 Generating configuration..."

# Create .spec directory
mkdir -p .spec

# Convert comma-separated strings to JSON arrays
voice_do_json=$(echo "$voice_do" | sed 's/,\s*/","/g' | sed 's/^/"/' | sed 's/$/"/')
voice_dont_json=$(echo "$voice_dont" | sed 's/,\s*/","/g' | sed 's/^/"/' | sed 's/$/"/')
languages_json=$(echo "$languages" | sed 's/,\s*/","/g' | sed 's/^/"/' | sed 's/$/"/')

# Generate timestamp
timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Create JSON file
cat > .spec/blog.spec.json <<JSON_EOF
{
  "version": "1.0.0",
  "blog": {
    "name": "$blog_name",
    "context": "$context",
    "objective": "$objective",
    "tone": "$tone",
    "languages": [$languages_json],
    "brand_rules": {
      "voice_do": [$voice_do_json],
      "voice_dont": [$voice_dont_json]
    }
  },
  "workflow": {
    "review_rules": {
      "must_have": [
        "Executive summary",
        "Source citations",
        "Actionable insights"
      ],
      "must_avoid": [
        "Unsourced claims",
        "Keyword stuffing",
        "Vague recommendations"
      ]
    }
  },
  "generated_at": "$timestamp"
}
JSON_EOF

# Validate JSON
echo ""
if command -v python3 >/dev/null 2>&1; then
  if python3 -m json.tool .spec/blog.spec.json > /dev/null 2>&1; then
    echo "✅ JSON validation passed"
  else
    echo "❌ JSON validation failed"
    echo "Please check .spec/blog.spec.json manually"
    exit 1
  fi
else
  echo "⚠️  python3 not found, skipping JSON validation"
  echo "   (Validation will happen when agents run)"
fi

# Success message
echo ""
echo "╔════════════════════════════════════════╗"
echo "║  ✅ Setup Complete!                    ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "Configuration saved to: .spec/blog.spec.json"
echo ""
echo "Your blog: $blog_name"
echo "Tone: $tone"
echo "Voice DO: $voice_do"
echo "Voice DON'T: $voice_dont"
echo ""
echo "Next steps:"
echo "  1. Review .spec/blog.spec.json"
echo "  2. Generate your first article: /blog-generate \"Your topic\""
echo ""
echo "Agents will automatically apply your brand rules! 🎨"
echo ""

SCRIPT_EOF

# Make script executable
chmod +x "$SCRIPT"

# Execute script
bash "$SCRIPT"

# Capture exit code
EXIT_CODE=$?

# Clean up
rm "$SCRIPT"

# Report result
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ Blog constitution created successfully!"
  echo ""
  echo "View your configuration:"
  echo "  cat .spec/blog.spec.json"
else
  echo "❌ Setup failed with exit code $EXIT_CODE"
  exit $EXIT_CODE
fi
```

## Expected Output

After running `/blog-setup`, you'll have:

**File**: `.spec/blog.spec.json`

**Example content**:
```json
{
  "version": "1.0.0",
  "blog": {
    "name": "Tech Insights",
    "context": "Technical blog for software developers",
    "objective": "Generate qualified leads and establish thought leadership",
    "tone": "pédagogique",
    "languages": ["fr", "en"],
    "brand_rules": {
      "voice_do": [
        "Clear",
        "Actionable",
        "Technical",
        "Data-driven"
      ],
      "voice_dont": [
        "Jargon without explanation",
        "Vague claims",
        "Salesy language"
      ]
    }
  },
  "workflow": {
    "review_rules": {
      "must_have": [
        "Executive summary",
        "Source citations",
        "Actionable insights"
      ],
      "must_avoid": [
        "Unsourced claims",
        "Keyword stuffing",
        "Vague recommendations"
      ]
    }
  },
  "generated_at": "2025-10-12T10:30:00Z"
}
```

## What Happens Next

When you run `/blog-generate`, agents will automatically:
1. Check if `.spec/blog.spec.json` exists
2. Load brand rules (voice do/don't)
3. Apply your tone preference
4. Follow review rules
5. Generate content consistent with your brand

**No manual configuration needed!** ✨

## Updating Configuration

To update your configuration:
1. Edit `.spec/blog.spec.json` manually, or
2. Run `/blog-setup` again (overwrites existing file)

## Validation

The script validates JSON automatically if `python3` is available. If validation fails, agents will catch errors when loading the constitution.

## Tips

1. **Be specific with voice guidelines**: "Avoid jargon" → "Avoid jargon without explanation"
2. **Balance DO/DON'T**: Provide both positive and negative guidelines
3. **Test tone**: Generate a test article after setup to verify tone matches expectations
4. **Iterate**: Don't worry about perfection - you can edit `.spec/blog.spec.json` anytime

---

**Ready to set up your blog?** Run `/blog-setup` now!
