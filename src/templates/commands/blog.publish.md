# Command: /blog.publish

Agent marketing pour publication, diffusion cross-canal et tracking.

## Description
Agent spécialisé dans la publication d'articles, diffusion sur réseaux sociaux, newsletters, et mise en place du tracking analytics.

## Role
**Agent ID**: `marketing`
**Goals**:
- Alignement offre/contenu
- CTA stratégique et conversion-oriented
- Diffusion cross-canal (social, email, SEO)
- Analytics & tracking configuré

**Guardrails**:
- Pas de promesses non vérifiées
- Transparence absolue
- Respect RGPD/privacy
- Authenticity > clickbait

## Input
- Article final path: `content/{blog}/{slug}/index.md`
- Blog constitution: `.spec/blog.spec.json`
- Distribution channels config (optionnel)

## Execution Flow

### Phase 1: Pre-Publication Checklist
1. **Validation finale content**
   - [ ] Tous les agents (copywriter, seo, research) validés
   - [ ] Review checklist complète
   - [ ] Aucune section `[TODO]` ou `[NEEDS CLARIFICATION]`
   - [ ] Links vérifiés (pas de 404)
   - [ ] Images optimisées + alt text

2. **Vérifier frontmatter**
   ```yaml
   ---
   draft: false  # ← Passer à false
   published_at: "2024-10-10T10:00:00Z"
   author: "John Doe"
   ---
   ```

### Phase 2: Call-to-Action Strategy
3. **Insérer CTA stratégiques**
   - **Above the fold**: CTA soft (newsletter, guide gratuit)
   - **Mid-content**: CTA medium (démo, consultation)
   - **Bottom**: CTA strong (achat, inscription)

4. **Example CTA blocks**
   ```markdown
   > **💡 Astuce**: Téléchargez notre [template Raycast + Adonis](link) pour démarrer en 5 minutes.

   ---

   ## Prêt à aller plus loin?

   Rejoignez 2,000+ développeurs qui reçoivent nos tutoriels avancés chaque semaine.

   [S'inscrire à la newsletter →](link)

   ---

   **Besoin d'aide pour implémenter?**
   Notre équipe propose des audits techniques et accompagnement.
   [Réserver une consultation gratuite →](link)
   ```

### Phase 3: Social Media Assets
5. **Générer posts social media**
   - **Twitter/X** (280 char):
     ```
     🚀 Nouveau: Guide complet Extension Raycast + AdonisJS v6

     ✅ Setup en 30 min
     ✅ TypeScript strict
     ✅ Code complet

     [LINK]

     #raycast #adonisjs #typescript
     ```

   - **LinkedIn** (3000 char max):
     ```
     Comment j'ai créé une extension Raycast connectée à AdonisJS v6

     [Hook: Problème résolu]
     [Corps: 3-5 insights clés]
     [CTA: Lire l'article complet]

     #webdev #typescript #productivity
     ```

   - **Mastodon/Bluesky**:
     Format similaire Twitter avec ton moins corporate

6. **Créer Open Graph image**
   - Dimensions: 1200x630px
   - Titre article + logo blog
   - Visual accrocheur
   - Texte lisible (mobile)

### Phase 4: Newsletter Integration
7. **Préparer email newsletter**
   ```html
   <h2>📝 Nouvel article: {TITLE}</h2>

   <p>{EXCERPT 2-3 phrases}</p>

   <p><strong>Ce que vous allez apprendre:</strong></p>
   <ul>
     <li>Point clé 1</li>
     <li>Point clé 2</li>
     <li>Point clé 3</li>
   </ul>

   <a href="{LINK}">Lire l'article complet →</a>
   ```

8. **Segmentation audience (optionnel)**
   - Segment débutants: Emphase tutorial step-by-step
   - Segment avancés: Emphase architecture + best practices

### Phase 5: Analytics & Tracking
9. **Configurer tracking events**
   ```javascript
   // Example: Plausible Analytics
   plausible('Article View', {
     props: {
       article_slug: 'guide-raycast-adonis',
       category: 'tutorial',
       author: 'john-doe'
     }
   });

   // CTA clicks
   plausible('CTA Click', {
     props: {
       cta_type: 'newsletter',
       position: 'mid-content'
     }
   });
   ```

10. **Setup conversion goals**
    - Goal 1: Article lu > 30 secondes
    - Goal 2: Scroll > 50%
    - Goal 3: CTA click
    - Goal 4: Newsletter signup from article

### Phase 6: Cross-Promotion
11. **Identifier articles connexes**
    - Ajouter banner "Lire aussi" en fin d'article
    - Update articles anciens avec lien vers nouveau

12. **Planifier republication**
    - Semaine 1: Social media + newsletter
    - Semaine 2-4: Republier sur Medium, Dev.to (avec canonical)
    - Mois 2-3: Update contenu + re-share

## Output

### Publication Checklist
- [ ] `draft: false` dans frontmatter
- [ ] `published_at` date définie
- [ ] CTA insérés (3 min)
- [ ] Social media posts rédigés
- [ ] Newsletter préparée
- [ ] Analytics tracking configuré
- [ ] Open Graph image générée

### Distribution Schedule
```yaml
publication:
  date: "2024-10-10T10:00:00Z"
  channels:
    - blog: "immediate"
    - twitter: "+1h"
    - linkedin: "+2h"
    - newsletter: "+1 day"
    - medium: "+7 days" (canonical)
    - dev.to: "+7 days" (canonical)
```

### Analytics Dashboard
Metrics à tracker (30 jours):
- **Engagement**:
  - Page views
  - Avg. time on page
  - Bounce rate
  - Scroll depth

- **Conversion**:
  - CTA clicks par position
  - Newsletter signups
  - Outbound clicks (docs, GitHub)

- **SEO**:
  - SERP position (keyword primaire)
  - Impressions Google
  - CTR SERP

## Post-Publication Actions

### J+1: First 24h Review
- Vérifier analytics (trafic, engagement)
- Répondre aux commentaires
- Partager sur social media

### J+7: Weekly Review
- Analyser SERP position
- Identifier top traffic sources
- Optimiser CTA sous-performants

### J+30: Monthly Audit
- ROI content (leads générés)
- Update contenu si obsolète
- Planifier follow-up articles

## Tools Integration
- **Buffer/Hootsuite**: Schedule social posts
- **ConvertKit/Mailchimp**: Newsletter automation
- **Plausible/Google Analytics**: Traffic tracking
- **Ahrefs/SEMrush**: SERP monitoring
- **Zapier**: Cross-platform automation

## Success Metrics
Article considéré "success" si:
- 500+ views (30 jours)
- 2min+ avg. time on page
- 5%+ CTA click rate
- Top 10 SERP (keyword primaire, 90 jours)

## Next Steps
Après publication:
1. Monitor analytics quotidiennement (J+1 à J+7)
2. Répondre engagement social media
3. Analyser feedback et itérer
4. Planifier article follow-up si high engagement
