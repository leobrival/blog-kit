# Blog Kit Scripts

Utility bash scripts for blog generation workflows.

## Available Scripts

### `validate-constitution.sh`

Validates `.spec/blog.spec.json` structure and required fields.

**Usage**:
```bash
bash scripts/validate-constitution.sh
```

**What it checks**:
- File exists
- Valid JSON syntax (via python3)
- Required fields present (`blog.name`, `blog.context`, `blog.tone`)

**Exit codes**:
- `0`: Constitution valid
- `1`: Constitution invalid or missing

---

### `sanitize-topic.sh`

Converts article topic to safe filename.

**Usage**:
```bash
bash scripts/sanitize-topic.sh "Your Article Topic"
# Output: your-article-topic
```

**Transformations**:
- Converts to lowercase
- Replaces spaces with hyphens
- Removes special characters
- Collapses multiple hyphens

**Examples**:
```bash
bash scripts/sanitize-topic.sh "Node.js Best Practices"
# Output: nodejs-best-practices

bash scripts/sanitize-topic.sh "Implementing OAuth 2.0"
# Output: implementing-oauth-20
```

---

### `preflight-check.sh`

Verifies system has required tools for blog generation.

**Usage**:
```bash
bash scripts/preflight-check.sh
```

**What it checks**:
- ✅ **curl** (required): For WebSearch/WebFetch
- ⚠️  **python3** (recommended): For JSON validation
- ⚠️  **jq** (optional): For advanced JSON parsing
- ⚠️  **git** (optional): For repository context
- 📁 Directories: Creates `.specify/` and `articles/` if missing
- 📄 Constitution: Checks if `.spec/blog.spec.json` exists

**Exit codes**:
- `0`: All required tools available
- `1`: Missing required tools (curl)

---

## Using Scripts in /tmp/

Agents generate scripts in `/tmp/` for one-time operations. These scripts are:
- Generated dynamically based on context
- Executed immediately
- Automatically cleaned up after use

**Example** (how agents use scripts):
```bash
# Agent generates script
cat > /tmp/validate-$$.sh <<'EOF'
#!/bin/bash
# Validation logic here
EOF

# Agent executes
chmod +x /tmp/validate-$$.sh
bash /tmp/validate-$$.sh

# Agent cleans up
rm /tmp/validate-$$.sh
```

**Benefits**:
- No file pollution in project directory
- Temporary scripts auto-deleted by OS
- Unique filenames prevent conflicts (`$$` = process ID)

---

## Integration with Agents

Agents automatically use these scripts when needed:

**Research Agent**:
- Validates constitution before starting
- Sanitizes topic for filename

**SEO Agent**:
- Loads constitution if exists
- Validates JSON before parsing

**Marketing Agent**:
- Checks constitution for brand rules
- Applies voice guidelines automatically

---

## Manual Usage

You can also use these scripts manually:

```bash
# Validate your constitution
bash scripts/validate-constitution.sh

# Generate safe filename
TOPIC="Best Practices for API Design"
FILENAME=$(bash scripts/sanitize-topic.sh "$TOPIC")
echo "$FILENAME"  # best-practices-for-api-design

# Check system requirements
bash scripts/preflight-check.sh
```

---

## Customization

These scripts are examples. Feel free to:
- Copy to your own directory
- Modify validation rules
- Add custom checks
- Create new utility scripts

**Example custom script**:
```bash
#!/bin/bash
# scripts/my-custom-check.sh

# Your custom validation logic
echo "Running custom checks..."

# Check something specific to your workflow
if [ -f ".env" ]; then
  echo "✅ Environment variables found"
else
  echo "⚠️  No .env file (may be optional)"
fi
```

---

## Requirements

**Required**:
- Bash shell (comes with macOS, Linux, WSL on Windows)
- `curl` (for web searches)

**Recommended**:
- `python3` (for JSON validation)
- `jq` (for advanced JSON parsing)

**Optional**:
- `git` (for repository context)

---

## Troubleshooting

### "python3: command not found"

**macOS**: Python 3 comes pre-installed on macOS 10.15+
**Linux**: `sudo apt install python3` or `sudo yum install python3`
**Windows**: Install Python from python.org or use WSL

### "jq: command not found"

**macOS**: `brew install jq`
**Linux**: `sudo apt install jq` or `sudo yum install jq`
**Windows**: Download from https://jqlang.github.io/jq/

### Scripts not executable

```bash
chmod +x scripts/*.sh
```

---

## Best Practices

1. **Test scripts before agents use them**: Run manually first
2. **Check exit codes**: Use `$?` to verify success
3. **Use /tmp/ for temporary work**: Keeps project clean
4. **Validate inputs**: Always check for empty or malformed inputs
5. **Provide helpful error messages**: Guide users to solutions

---

**Need help?** Check [CLAUDE.md](../CLAUDE.md) for how agents use these scripts.
