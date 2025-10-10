# Blog Spec Kit

CLI pour génération d'articles de blog optimisés par IA avec spec-driven development.

Inspiré de [spec-kit](https://github.com/github/spec-kit) de GitHub, adapté pour la création de contenu éditorial avec agents IA multi-étapes.

## 🚀 Features

- **CLI interactif** avec [Ink](https://github.com/vadimdemedes/ink) (React pour terminal)
- **🤖 Multi-agents IA professionnels**: Research Intelligence, SEO Specialist, Marketing Specialist
- **Spec-driven**: Constitution éditoriale comme source de vérité
- **Templates slash commands**: `/blog.constitution`, `/blog.specify`, `/blog.research`, `/blog.optimize`, `/blog.publish`
- **Validation Zod**: Schéma TypeScript strict pour spécifications
- **Markdown generation**: Structure complète avec frontmatter optimisé
- **Agent orchestration**: Workflow automatisé research → SEO → marketing

## 📦 Installation

### Option 1: Claude Code Plugin (Recommandé) ⚡

Installation en une commande depuis Claude Code:

```bash
/plugin marketplace add leobrival/blog-kit
/plugin install blog-kit
```

Puis utilisez directement:
```bash
blog-spec init
blog-spec analyze
blog-spec article "Mon sujet"
```

### Option 2: Installation Manuelle

```bash
# Clone le repo
git clone https://github.com/leobrival/blog-kit.git
cd blog-kit

# Installer avec Bun
bun install

# Build
bun run build

# Ou lancer en dev
bun run dev
```

### Option 3: Installation Globale

```bash
# Depuis le dossier du projet
bun link

# Puis utiliser partout
blog-spec init
```

## 🎯 Usage

### 1. Initialiser un blog

```bash
bun run dev
# Puis choisir: init

# Ou directement
blog-spec init
```

Le CLI vous pose 11 questions pour configurer:
- Nom du blog, contexte, objectifs
- Tonalité (expert/pédagogique/convivial/corporate)
- Voice guidelines (DO/DON'T)
- Sujet d'article par défaut

**Output**: `.spec/blog.spec.json`

### 2. Générer la structure Markdown

```bash
blog-spec generate
```

**Output**:
- `content/{blog-name}/Claude.md` - Brief pour agents IA
- `content/{blog-name}/{article-slug}/index.md` - Template article

### 3. Valider la spécification

```bash
blog-spec validate
```

Vérifie le schéma Zod de `.spec/blog.spec.json`.

### 4. Vérifier les outils disponibles

```bash
blog-spec check
```

Vérifie: Claude CLI, GitHub Copilot, Git, Node.js, Bun.

### 5. Workflow complet article ✅

```bash
blog-spec article "Guide: Extension Raycast + AdonisJS v6"
```

Orchestration multi-agents automatisée:

1. **🔍 Research Intelligence**
   - Génération 5-10 sources documentaires (docs officielles, études, exemples)
   - FAQ basée sur PAA (People Also Ask)
   - Fact-checking et citations
   - Bibliographie structurée

2. **📈 SEO Specialist**
   - Analyse keyword density (optimal 1-2%)
   - Optimisation meta tags + Schema.org
   - Structure headings (H1-H6)
   - Internal/external linking
   - SEO checklist complet

3. **📢 Marketing Specialist**
   - CTAs stratégiques (soft/medium/strong)
   - Posts social media (Twitter, LinkedIn, Mastodon)
   - Email newsletter template
   - Analytics tracking (Plausible/GA4)
   - Distribution schedule

**Output**: Article enrichi avec sources, optimisations SEO, CTAs et assets marketing

```bash
# Agents spécifiques
blog-spec article "Votre sujet" --agents research,seo
blog-spec article "Votre sujet" --agents seo
```

## 📁 Structure du projet

```
blog-kit/
├── src/
│   ├── index.tsx              # Entry point CLI
│   ├── cli/
│   │   ├── init.tsx           # Commande init
│   │   ├── generate.tsx       # Commande generate
│   │   ├── validate.tsx       # Commande validate
│   │   └── check.tsx          # Commande check
│   ├── components/
│   │   ├── InitForm.tsx       # Formulaire interactif Ink
│   │   └── TextInput.tsx      # Input component
│   ├── schemas/
│   │   └── blog.schema.ts     # Zod schemas
│   ├── templates/
│   │   ├── commands/          # Slash commands templates
│   │   │   ├── blog.constitution.md
│   │   │   ├── blog.specify.md
│   │   │   ├── blog.research.md
│   │   │   ├── blog.optimize.md
│   │   │   └── blog.publish.md
│   │   └── article/           # Article templates
│   ├── utils/
│   │   ├── slugify.ts
│   │   ├── default-blocks.ts
│   │   └── default-agents.ts
│   └── scripts/
│       ├── bash/
│       └── powershell/
├── .spec/                     # Généré par CLI
│   └── blog.spec.json
├── content/                   # Généré par CLI
│   └── {blog-name}/
│       ├── Claude.md
│       └── {article-slug}/
│           └── index.md
├── package.json
├── tsconfig.json
└── README.md
```

## 🤖 Agents IA Professionnels

Basés sur les agents spécialisés de Claude Code et les best practices SEO, Research Intelligence et Marketing.

### Research Intelligence Specialist
- **Basé sur**: `/Users/leobrival/.claude/agents/product/research-intelligence-specialist.md`
- **Goals**: Sources fiables, fact-checking, citations, PAA, intelligence compétitive
- **Guardrails**: Jamais de sources non vérifiées, citer systématiquement, sources < 2 ans
- **Output**: 5-10 sources documentaires, FAQ PAA, bibliographie, méthodologie de recherche

### SEO Specialist
- **Basé sur**: `/Users/leobrival/.claude/agents/product/seo-specialist.md`
- **Goals**: Keyword research, on-page SEO, technical SEO, interlinking, Core Web Vitals
- **Guardrails**: Pas de keyword stuffing (densité 1-2%), user experience > robots
- **Output**: Meta tags optimisés, Schema.org markup, SEO checklist, recommendations

### Marketing Specialist
- **Basé sur**: `/Users/leobrival/.claude/agents/product/marketing-specialist.md`
- **Goals**: Conversion optimization, social media, email marketing, analytics, distribution
- **Guardrails**: Transparence, pas de promesses non vérifiées, authenticité > clickbait
- **Output**: CTAs stratégiques, social posts, email template, analytics tracking, distribution schedule

📚 **Documentation complète**: Voir [AGENTS.md](./AGENTS.md) pour l'architecture, usage et best practices

## 📚 Slash Commands

Inspiré de spec-kit, 5 commandes pour workflow éditorial:

### `/blog.constitution`
Établir principes éditoriaux (voice, tone, review rules).

### `/blog.specify [Sujet]`
Créer spécification d'article (structure, keywords, SERP analysis).

### `/blog.research`
Enrichir sources externes, PAA, fact-checking.

### `/blog.optimize`
Optimisation SEO on-page (meta, headings, interlinking).

### `/blog.publish`
Publication + diffusion (CTA, social, analytics).

## 🔧 Configuration

### `.spec/blog.spec.json`

```json
{
  "blog": {
    "name": "Mon Blog",
    "context": "Blog tech pour fondateurs",
    "objective": "Générer des leads qualifiés",
    "tone": "pédagogique",
    "languages": ["fr"],
    "brand_rules": {
      "voice_do": ["Clair", "Actionnable"],
      "voice_dont": ["Jargon inutile"]
    }
  },
  "workflow": {
    "agents": [...],
    "review_rules": {
      "must_have": ["Sommaire", "Sources citées", "FAQ"],
      "must_avoid": ["Claims non sourcés", "Keyword stuffing"]
    }
  },
  "content_model": {
    "blocks": [...]
  },
  "article_template": {
    "topic": "Guide: Extension Raycast",
    "search_intent_response": "Tutoriel étape par étape"
  }
}
```

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **CLI Framework**: [Commander.js](https://github.com/tj/commander.js)
- **UI**: [Ink](https://github.com/vadimdemedes/ink) (React pour terminal)
- **Validation**: [Zod](https://zod.dev)
- **Styling**: [Chalk](https://github.com/chalk/chalk) + [gradient-string](https://github.com/bokub/gradient-string)

## 📈 Roadmap

### Phase 1 ✅ (Completed)
- [x] CLI init interactif
- [x] Generate structure Markdown
- [x] Validation Zod schema
- [x] Check tools command
- [x] Templates slash commands
- [x] **Agent orchestration (`article` command)**
- [x] **Research Intelligence agent**
- [x] **SEO Specialist agent**
- [x] **Marketing Specialist agent**
- [x] **Agent base architecture**

### Phase 2 (Next)
- [ ] Copywriter agent (génération contenu AI)
- [ ] WebSearch integration (Google/Bing API)
- [ ] WebFetch integration (scraping sources)
- [ ] AI integration (OpenAI/Anthropic)
- [ ] Git integration (branches auto)
- [ ] CI/CD validation

### Phase 3 (Future)
- [ ] Agent plugin system
- [ ] Custom agent templates
- [ ] Agent marketplace
- [ ] Multi-language agents
- [ ] Real-time collaboration
- [ ] CMS integrations (Notion, Contentful)

## 🤝 Contributing

Contributions welcome! Ce projet est inspiré de spec-kit et adapté pour content creation.

## 📄 License

MIT

---

**Inspiré par**: [spec-kit](https://github.com/github/spec-kit) - GitHub
**Built with**: Bun + Ink + Zod + TypeScript
