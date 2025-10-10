# Command: /blog.specify [Sujet article]

Créer une spécification d'article optimisée SEO avec agents multi-étapes.

## Description
Cette commande génère une spécification complète d'article incluant structure, keywords, intention de recherche, et checklist de contenu basée sur la constitution du blog.

## Input
- `$TOPIC` - Sujet principal de l'article
- `$SEARCH_INTENT` - Intention de recherche cible (informational/navigational/transactional)
- `$KEYWORDS` - Keywords primaires et secondaires (optionnel)
- `$TARGET_AUDIENCE` - Audience cible (optionnel)

## Execution Flow

### Phase 1: Analyse SERP & Intent
1. **Analyser intention de recherche**
   - Déterminer type: informational/navigational/transactional
   - Identifier PAA (People Also Ask) sur Google
   - Extraire featured snippets structure

2. **Identifier keywords**
   - Keyword primaire (volume + difficulté)
   - Keywords secondaires (LSI keywords)
   - Long-tail variations

### Phase 2: Structure Content
3. **Générer structure H2/H3**
   - Basé sur SERP top 10 results
   - Aligné sur constitution blog (tone, voice)
   - Inclure sections obligatoires (FAQ, sources, etc.)

4. **Définir blocs de contenu**
   - Lire `content_model.blocks` depuis constitution
   - Activer blocs requis: FAQ, summary, external_sources, links
   - Marquer blocs optionnels: tables, images, audio

### Phase 3: Research Requirements
5. **Lister sources requises**
   - Documentation officielle (si applicable)
   - Études/statistiques (pour crédibilité)
   - Exemples/cas d'usage (pour praticité)

6. **Créer checklist de review**
   - Must-have: Sommaire, sources citées, FAQ PAA-based
   - Must-avoid: Keyword stuffing, claims non sourcés
   - SEO: meta description <160 char, balises optimisées

### Phase 4: Output Generation
7. **Générer fichier Markdown**
   - Frontmatter avec metadata
   - Structure complète avec placeholders
   - Commentaires pour agents (copywriter, seo, research)

8. **Créer branch Git (optionnel)**
   - Format: `article/{topic-slug}`
   - Auto-commit de la spec

## Output
- Branch: `article/{topic-slug}` (si Git activé)
- File: `content/{blog}/{slug}/index.md`
- Status: Draft, prêt pour `/blog.research`

## Template Structure

```markdown
---
title: "{TOPIC}"
lang: "fr"
description: "{SEARCH_INTENT_RESPONSE}"
draft: true
agents: ["copywriter", "seo", "research", "marketing"]
keywords:
  primary: ["{PRIMARY_KEYWORD}"]
  secondary: ["{SECONDARY_1}", "{SECONDARY_2}"]
seo:
  meta_description: "{META_DESC}"
---

# {TOPIC}

> **Intention de recherche**: {SEARCH_INTENT_RESPONSE}

## Résumé exécutif
<!-- Agent copywriter: 3-5 bullet points TL;DR -->

## Sommaire
<!-- Auto-généré depuis H2/H3 -->

## Introduction
<!-- Agent copywriter: hook + contexte + promesse -->

## {SECTION_2_TITLE}
<!-- Agent copywriter: contenu principal -->

## FAQ
<!-- Agent research: Questions from PAA + réponses -->

## Ressources & Sources
<!-- Agent research: liens externes vérifiés -->

---
*Agents: copywriter (structure), seo (keywords), research (sources)*
```

## Validation Checklist
- [ ] Meta description < 160 caractères
- [ ] H1 unique avec keyword primaire
- [ ] H2/H3 hiérarchie logique
- [ ] FAQ basée sur PAA réel
- [ ] Sources externes citées (min 3)
- [ ] Tone aligné sur constitution
- [ ] CTA clair et actionnable

## Next Steps
1. Exécuter `/blog.research` pour enrichir sources
2. Exécuter `/blog.optimize` pour SEO on-page
3. Review manuel + edits
4. `/blog.publish` pour diffusion
