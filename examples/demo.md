# Demo: Blog Spec Kit

Exemple d'utilisation du CLI pour créer un blog tech.

## Étape 1: Initialisation

```bash
$ bun run dev init

🚀 Blog Spec Kit - Initialisation

Nom du blog (Mon Blog)
→ DevTips Blog

Contexte (qui/quoi/pourquoi) (Blog tech pour fondateurs et devs.)
→ Blog tech pour développeurs fullstack et fondateurs de SaaS

Objectif principal (Générer des leads qualifiés via du contenu expert.)
→ Éduquer et convertir développeurs en clients de notre plateforme

Tonalité (expert/pédagogique/convivial/corporate) (pédagogique)
→ expert

... (suite des questions)

✔ Spécification créée avec succès!
Fichier: /Users/user/project/.spec/blog.spec.json
```

## Étape 2: Génération structure

```bash
$ bun run dev generate

✨ Structure générée avec succès!
📁 Brief éditorial: content/devtips-blog/Claude.md
📝 Article template: content/devtips-blog/guide-lancer.../index.md
```

## Étape 3: Validation

```bash
$ bun run dev validate

✅ Spécification valide!
✓ Schéma JSON valide
✓ 4 agents configurés
✓ 9 blocs de contenu actifs
✓ 1 langue(s): fr
```

## Étape 4: Vérification outils

```bash
$ bun run dev check

🔍 Vérification des outils disponibles
✓ Claude Code (claude version 0.1.0)
✗ GitHub Copilot
✓ Git (git version 2.39.0)
✓ Node.js (v20.10.0)
✓ Bun (1.2.12)

4/5 outils disponibles
```

## Étape 5: Créer un article (WIP)

```bash
$ bun run dev article "Guide: API REST avec Hono et Bun"

🚧 Workflow article pour: "Guide: API REST avec Hono et Bun"
Agents: all
Cette fonctionnalité sera implémentée prochainement avec orchestration multi-agents.
```

## Structure générée

```
content/
└── devtips-blog/
    ├── Claude.md                                      # Brief agents
    └── guide-lancer-une-extension-raycast.../
        └── index.md                                   # Article template
```

### Claude.md (Brief)

```markdown
# Ligne éditoriale – DevTips Blog

## Contexte
Blog tech pour développeurs fullstack et fondateurs de SaaS

## Objectif
Éduquer et convertir développeurs en clients de notre plateforme

## Ton
expert

## Règles de marque
**Do:** Clair, Actionnable, Sources citées
**Don't:** Jargon inutile, Promesses non vérifiées

## Workflow multi-agents
- **copywriter**: Clarté, Structure logique, CTA clair, Tone cohérent
- **seo**: SERP intent match, Balises H1-H6 optimisées, Interlinking, Meta descriptions
- **research**: Sources fiables, Faits vérifiés, Citations, PAA intégré
- **marketing**: Alignement offre, CTA stratégique, Diffusion cross-canal

## Review rules
- Must-have: Sommaire clair, Sources externes citées, FAQ basée sur PAA
- Must-avoid: Claims non sourcés, Keyword stuffing
```

### index.md (Article template)

```markdown
---
title: "Guide: lancer une extension Raycast connectée à Adonis v6"
lang: "fr"
description: "Un tutoriel étape par étape avec code et pièges à éviter."
draft: true
agents: ["copywriter","seo","research","marketing"]
---

# Guide: lancer une extension Raycast connectée à Adonis v6

> Intention de recherche: Un tutoriel étape par étape avec code et pièges à éviter.

## Résumé exécutif
_TL;DR en 3 à 5 points._

## Sommaire
- [Introduction](#introduction)
- [Tutoriel](#tutoriel)
- [FAQ](#faq)
- [Ressources](#ressources)

## Introduction
Contexte et promesse.

## Tutoriel
Étapes…

## Tableaux / Données
| Col1 | Col2 |
|---|---|
| x | y |

## Liens
- [Ressource 1](#)
- [Ressource 2](#)

## FAQ
- **Q:** …
  **R:** …

## Sources externes
- Source A
- Source B

## À éviter
_(rien de spécifique)_

<!-- Infos supplémentaires -->
<!-- -->
```

## Workflow multi-agents (Future)

```bash
# Créer article complet avec tous les agents
$ blog-spec article "Guide: API REST Hono + Bun"

🤖 Agent copywriter: spécification...
✓ Structure H2/H3 créée
✓ Frontmatter généré

🔍 Agent research: recherche sources...
✓ 8 sources externes collectées
✓ FAQ avec 5 questions PAA

📈 Agent SEO: optimisation...
✓ Keywords density: 1.8%
✓ Meta description: 156 char
✓ 4 liens internes ajoutés

📢 Agent marketing: publication...
✓ 3 CTA insérés
✓ Social media posts créés
✓ Analytics configuré

✅ Article généré: content/devtips-blog/guide-api-rest-hono-bun/index.md
```

## Slash Commands disponibles

Tous les templates sont dans `src/templates/commands/`:

- `/blog.constitution` - Établir principes éditoriaux
- `/blog.specify` - Créer spécification article
- `/blog.research` - Enrichir sources & PAA
- `/blog.optimize` - Optimisation SEO on-page
- `/blog.publish` - Publication & diffusion

Ces commandes seront utilisables via Claude Code ou autres AI agents configurés.
