# Command: /blog.optimize

Agent SEO pour optimisation on-page, balises meta, et interlinking.

## Description
Agent spécialisé dans l'optimisation SEO technique et sémantique des articles, incluant balises meta, structure H1-H6, keywords density, et stratégie d'interlinking.

## Role
**Agent ID**: `seo`
**Goals**:
- SERP intent match parfait
- Balises H1-H6 optimisées
- Interlinking stratégique (interne + externe)
- Meta descriptions performantes
- Schema.org markup

**Guardrails**:
- Pas de keyword stuffing (densité < 2%)
- Keyword naturel et conversationnel
- Lisibilité avant optimisation
- User experience > robots

## Input
- Article draft path: `content/{blog}/{slug}/index.md`
- Blog constitution: `.spec/blog.spec.json`

## Execution Flow

### Phase 1: Keywords Analysis
1. **Analyser keywords density**
   - Keyword primaire: 1-2% du contenu
   - Keywords secondaires: 0.5-1% chacun
   - LSI keywords: distribution naturelle

2. **Vérifier placement stratégique**
   - H1 (title): contient keyword primaire
   - Premier paragraphe: keyword primaire dans 100 premiers mots
   - H2/H3: variations keyword + LSI
   - Meta description: keyword primaire naturel

### Phase 2: Structure Optimization
3. **Optimiser hiérarchie headings**
   ```markdown
   # H1: Titre principal (unique, keyword primaire)
   ## H2: Section principale (keyword variations)
   ### H3: Sous-section (LSI keywords)
   ```

4. **Vérifier structure sémantique**
   - Un seul H1
   - H2 logiquement ordonnés
   - Pas de saut de niveau (H2 → H4)
   - Chaque H2/H3 substantiel (> 100 mots après)

### Phase 3: Meta Tags Optimization
5. **Générer meta description**
   - Longueur: 150-160 caractères
   - Inclure keyword primaire
   - Call-to-action clair
   - Unique et descriptive

6. **Enrichir frontmatter SEO**
   ```yaml
   ---
   title: "Titre optimisé | Nom du blog"
   description: "Meta description 150-160 char avec keyword"
   keywords:
     primary: ["keyword primaire"]
     secondary: ["keyword 2", "keyword 3"]
   seo:
     canonical: "https://blog.com/slug"
     og_image: "/images/slug-cover.jpg"
     schema_type: "Article"
   ---
   ```

### Phase 4: Interlinking Strategy
7. **Identifier opportunités interlinking interne**
   - Lire autres articles du blog (via `content/{blog}/`)
   - Trouver 3-5 articles connexes
   - Insérer liens contextuels (anchor text descriptif)

8. **Optimiser liens externes**
   - Vérifier attribut `rel="noopener"` sur liens externes
   - Équilibrer dofollow/nofollow
   - Privilégier sites haute autorité

### Phase 5: Rich Snippets & Schema
9. **Ajouter Schema.org markup**
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "Article",
     "headline": "{TITLE}",
     "author": {
       "@type": "Person",
       "name": "{AUTHOR}"
     },
     "datePublished": "{DATE}",
     "description": "{META_DESC}"
   }
   </script>
   ```

10. **Optimiser pour featured snippets**
    - FAQ: Format Q&A structure
    - Lists: Utiliser listes numérotées/bullets
    - Tables: Pour données comparatives

### Phase 6: Readability & UX
11. **Vérifier lisibilité**
    - Phrases courtes (< 25 mots moyenne)
    - Paragraphes courts (< 5 lignes)
    - Sous-titres fréquents (tous les 300 mots)
    - Mots de transition

12. **Optimiser images (si présentes)**
    - Alt text descriptif avec keyword
    - Format WebP ou optimisé
    - Lazy loading
    - Dimensions spécifiées

## Output
Frontmatter enrichi:
```yaml
---
title: "Guide complet: Extension Raycast + AdonisJS v6 | Blog Tech"
description: "Créez une extension Raycast connectée à AdonisJS v6 en 30 minutes. Tutoriel complet avec code et pièges à éviter."
keywords:
  primary: ["extension raycast adonis"]
  secondary: ["raycast api", "adonisjs v6", "typescript raycast"]
seo:
  canonical: "https://blog.com/guide-raycast-adonis-v6"
  meta_description: "Créez une extension Raycast connectée à AdonisJS v6 en 30 minutes. Tutoriel complet avec code et pièges à éviter."
  og_title: "Guide: Extension Raycast + AdonisJS v6"
  og_image: "/images/raycast-adonis-cover.jpg"
  schema_type: "Article"
readability:
  flesch_score: 65
  avg_sentence_length: 18
---
```

Interlinking ajouté:
```markdown
Si vous débutez avec Raycast, consultez notre [guide d'introduction à Raycast](../introduction-raycast).

Pour approfondir AdonisJS v6, voir notre [comparatif AdonisJS vs NestJS](../adonis-vs-nest).
```

## Quality Checks
- [ ] Keyword primaire densité 1-2%
- [ ] Meta description 150-160 char avec keyword
- [ ] H1 unique contenant keyword primaire
- [ ] 3-5 liens internes contextuels
- [ ] Alt text sur toutes les images
- [ ] Schema.org markup ajouté
- [ ] Aucun lien cassé (404)
- [ ] Lisibilité Flesch > 60

## SEO Scoring
Après optimisation, vérifier:
- **On-Page SEO**: 90%+
  - Title tag ✓
  - Meta description ✓
  - Headings structure ✓
  - Keyword optimization ✓

- **Technical SEO**: 85%+
  - Schema markup ✓
  - Internal linking ✓
  - Image optimization ✓

- **Content Quality**: 80%+
  - Readability ✓
  - Originality ✓
  - Depth ✓

## Tools Integration (Optionnel)
- **Yoast SEO CLI**: Analyse automatique
- **Google Search Console API**: SERP tracking
- **Ahrefs API**: Keyword research
- **Lighthouse CI**: Performance score

## Next Steps
Après optimisation SEO:
1. Review manuel SEO checklist
2. Test preview SERP (Google snippet simulator)
3. `/blog.publish` pour diffusion
4. Monitor SERP position (7-14 jours)
