# Agents System - Blog Spec Kit

Documentation complète du système d'agents IA pour la génération d'articles optimisés.

## Vue d'ensemble

Le système d'agents de Blog Spec Kit est inspiré des agents spécialisés de Claude Code et implémente les best practices des spécialistes SEO, Research Intelligence et Marketing.

### Architecture

```
AgentOrchestrator
    ├── Research Intelligence Specialist
    ├── SEO Specialist
    └── Marketing Specialist
```

## Agents disponibles

### 1. Research Intelligence Specialist

**Basé sur**: `/Users/leobrival/.claude/agents/product/research-intelligence-specialist.md`

**Rôle**: Recherche documentaire, fact-checking, intelligence compétitive

**Capabilities**:
- Génération de sources documentaires (documentation officielle, études, exemples)
- Extraction FAQ basée sur PAA (People Also Ask)
- Validation qualité des sources (high/medium/low)
- Méthodologie de recherche rigoureuse
- Citations et bibliographie automatiques

**Output**:
```markdown
## Ressources & Sources
### Documentation officielle
- [Source 1](url) - Description
- [Source 2](url) - Description

### Études & Statistiques
- [Study 2024](url) - Insight clé

### FAQ
**Q: Question PAA?**
R: Réponse sourcée [^1]

### Bibliographie
[^1]: [Source](url), 2024
```

**Metrics**:
- Sources added: 5-10 (min 5 recommandé)
- FAQ questions: 3-5
- Facts cited: Variable
- Source quality: high/medium/low

**Best Practices**:
- ✅ Privilégier sources < 2 ans
- ✅ Minimum 2 sources officielles (documentation)
- ✅ Inclure études/statistiques (crédibilité)
- ✅ Citer systématiquement les claims
- ✅ Valider tous les faits techniques

---

### 2. SEO Specialist

**Basé sur**: `/Users/leobrival/.claude/agents/product/seo-specialist.md`

**Rôle**: Optimisation on-page, keywords, technical SEO, interlinking

**Capabilities**:
- Analyse keyword density (optimal 1-2%)
- Optimisation meta description (150-160 char)
- Structure headings (H1 unique, H2/H3 hiérarchie)
- Internal linking (3-5 liens minimum)
- External linking (3-5 liens autorité)
- Schema.org markup (JSON-LD Article)
- Image alt text validation
- SEO checklist complet

**Output**:
```yaml
---
seo:
  meta_description: "Description optimisée avec keyword"
  canonical: "https://blog.com/slug"
  og_title: "Titre Open Graph"
  og_image: "/images/cover.jpg"
  schema_type: "Article"
---

<!-- SEO Checklist -->
- [ ] Keyword primaire dans H1
- [ ] Keyword density 1-2%
- [ ] Meta description 150-160 char
- [ ] 3-5 liens internes
- [ ] Images avec alt text
- [ ] Schema markup
```

**Metrics**:
- Keyword density: 0-5% (optimal 1-2%)
- Headings: Total count + with keyword
- Meta description length: 150-160 char
- Internal links: 3-5 minimum
- External links: 3-5 minimum
- Images with alt: Count

**Best Practices**:
- ✅ Keyword primaire dans H1 (obligatoire)
- ✅ Keyword dans 100 premiers mots
- ✅ Pas de keyword stuffing (< 2%)
- ✅ LSI keywords naturels
- ✅ Liens contextuels (pas footer)
- ✅ Alt text descriptif avec keyword

---

### 3. Marketing Specialist

**Basé sur**: `/Users/leobrival/.claude/agents/product/marketing-specialist.md`

**Rôle**: Conversion optimization, social media, email marketing, analytics

**Capabilities**:
- CTA stratégique (soft/medium/strong)
- Social media posts (Twitter, LinkedIn, Mastodon)
- Email newsletter template
- Conversion optimizations (urgency, social proof, trust badges)
- Analytics tracking setup (Plausible/GA4)
- Distribution schedule
- UTM parameters

**Output**:
```markdown
> **💡 Astuce**: CTA soft above-fold
[Action →](#)

---
## CTA Medium
[S'inscrire →](#)
---

**CTA Strong**
[Consultation →](#)

<!-- Marketing Assets -->
### Social Media Posts
**Twitter**: Post optimisé 280 char
**LinkedIn**: Post professionnel
**Email**: Template newsletter

### Analytics Tracking
- event: 'cta_click'
- event: 'scroll_depth'
- Goals: Newsletter signup, article read >30s
```

**Metrics**:
- CTAs added: 3 (soft/medium/strong)
- Social posts generated: 3 (Twitter/LinkedIn/Mastodon)
- Email template: Created
- Conversion optimizations: 3 (urgency/social proof/trust)

**Best Practices**:
- ✅ CTA above-fold (soft: newsletter, guide)
- ✅ CTA mid-content (medium: démo, webinar)
- ✅ CTA bottom (strong: consultation, achat)
- ✅ Social proof (témoignages, stats)
- ✅ Urgency/scarcity (offres limitées)
- ✅ Analytics tracking configuré

---

## Agent Orchestrator

### Usage

```bash
# Tous les agents (défaut)
blog-spec article "Votre sujet"

# Agents spécifiques
blog-spec article "Votre sujet" --agents research,seo
blog-spec article "Votre sujet" --agents seo
```

### Workflow

1. **Load spec**: Lit `.spec/blog.spec.json`
2. **Find article**: Localise `content/{blog}/{slug}/index.md`
3. **Execute agents**: Séquentiellement (research → seo → marketing)
4. **Update content**: Chaque agent enrichit le contenu
5. **Write file**: Sauvegarde le résultat final

### Execution Order

L'ordre est important pour maximiser l'efficacité:

1. **Research** (first)
   - Ajoute sources + FAQ
   - Fournit base factuelle pour SEO/Marketing

2. **SEO** (second)
   - Optimise contenu existant
   - Ajoute meta + keywords

3. **Marketing** (last)
   - Insère CTAs
   - Ajoute assets distribution
   - Configure analytics

---

## Agent Base Class

Tous les agents héritent de `BaseAgent`:

```typescript
export abstract class BaseAgent {
  abstract name: string;
  abstract role: 'copywriter' | 'seo' | 'research' | 'marketing';
  abstract description: string;

  abstract execute(context: AgentContext): Promise<AgentResult>;

  protected log(message: string): void;
  protected warn(message: string): void;
  protected error(message: string): void;
}
```

### AgentContext

```typescript
interface AgentContext {
  spec: BlogSpec;           // Blog configuration
  articlePath: string;      // Path to article
  articleContent: string;   // Current content
  topic: string;            // Article topic
}
```

### AgentResult

```typescript
interface AgentResult {
  success: boolean;
  updatedContent: string;      // Modified content
  summary: string;             // Agent summary
  metrics?: Record<string, any>; // Performance metrics
  warnings?: string[];          // Issues found
  recommendations?: string[];   // Actionable suggestions
}
```

---

## Example Output

```bash
$ blog-spec article "Guide: API REST avec Hono et Bun"

🚀 Starting orchestration for: "Guide: API REST avec Hono et Bun"

📄 Article path: content/mon-blog/guide-api-rest.../index.md

============================================================
🤖 Executing: Research Intelligence Specialist
============================================================

[Research Intelligence Specialist] Starting research...
[Research Intelligence Specialist] Generated 6 research sources
[Research Intelligence Specialist] Generated 5 FAQ questions

✅ Research Intelligence Complete

**Metrics:**
- Sources added: 6
- FAQ questions: 5
- Facts cited: 7
- Source quality: high

============================================================
🤖 Executing: SEO Specialist
============================================================

[SEO Specialist] Starting SEO optimization...
[SEO Specialist] Primary keyword: guide api rest

✅ SEO Optimization Complete

**Metrics:**
- Keyword density: 1.8%
- Headings: 12 (8 with keyword)
- Meta description: 156 characters
- Internal links: 4
- External links: 6

**Warnings:**
- ⚠️  Add 1 more internal link

============================================================
🤖 Executing: Marketing Specialist
============================================================

[Marketing Specialist] Starting marketing optimization...
[Marketing Specialist] Added 3 strategic CTAs

✅ Marketing Optimization Complete

**Metrics:**
- CTAs added: 3
- Social posts generated: 3
- Email template: Created

✅ Article updated: content/mon-blog/guide-api-rest.../index.md

📊 Orchestration Complete
Success Rate: 3/3 agents
```

---

## Configuration

### Activer/Désactiver agents

Dans `.spec/blog.spec.json`:

```json
{
  "workflow": {
    "agents": [
      { "id": "research", "role": "research", "active": true },
      { "id": "seo", "role": "seo", "active": true },
      { "id": "marketing", "role": "marketing", "active": false }
    ]
  }
}
```

### Custom agents

Créez un nouveau agent:

```typescript
// src/agents/custom-agent.ts
import { BaseAgent, AgentContext, AgentResult } from './base-agent';

export class CustomAgent extends BaseAgent {
  name = 'Custom Agent';
  role = 'custom' as const;
  description = 'Your custom agent';

  async execute(context: AgentContext): Promise<AgentResult> {
    // Your logic here
    return {
      success: true,
      updatedContent: context.articleContent,
      summary: 'Custom agent executed',
    };
  }
}
```

Enregistrez-le dans orchestrator:

```typescript
// src/agents/agent-orchestrator.ts
import { CustomAgent } from './custom-agent';

constructor() {
  this.agents = new Map();
  this.registerAgent(new CustomAgent());
  // ...
}
```

---

## Best Practices

### Pour les agents

1. **Idempotence**: Agent peut être ré-exécuté sans dégâts
2. **Progressive enhancement**: Améliore contenu existant
3. **Clear warnings**: Signale problèmes clairement
4. **Actionable recommendations**: Suggestions concrètes
5. **Metrics tracking**: Mesure performance

### Pour l'orchestration

1. **Order matters**: Research → SEO → Marketing
2. **Fail gracefully**: Un agent échoué n'arrête pas tout
3. **Content evolution**: Chaque agent enrichit le précédent
4. **Atomic writes**: Sauvegarde finale unique
5. **Verbose logging**: Traçabilité complète

---

## Troubleshooting

### Agent fails

```bash
❌ Agent SEO Specialist failed: Keyword not found
```

**Solution**: Vérifier que le topic contient des keywords valides.

### Article not found

```bash
❌ Article not found. Run `blog-spec generate` first.
```

**Solution**: Exécuter `blog-spec generate` pour créer la structure.

### Low source quality

```bash
⚠️  Source quality is medium. Aim for high-authority sources.
```

**Solution**: Ajouter plus de sources officielles (documentation, études).

---

## Roadmap

### Phase 1 ✅ (Current)
- [x] Base agent architecture
- [x] Research Intelligence agent
- [x] SEO Specialist agent
- [x] Marketing Specialist agent
- [x] Agent orchestrator

### Phase 2 (Next)
- [ ] Copywriter agent (génération contenu)
- [ ] WebSearch integration (API Google/Bing)
- [ ] WebFetch integration (scraping sources)
- [ ] AI integration (OpenAI/Anthropic) pour génération

### Phase 3 (Future)
- [ ] Agent plugin system
- [ ] Custom agent templates
- [ ] Agent marketplace
- [ ] Multi-language agents

---

**Built with** ❤️ **inspired by Claude Code agents**
**Based on**: Professional SEO, Research Intelligence & Marketing best practices
