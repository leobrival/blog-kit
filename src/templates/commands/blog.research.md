# Command: /blog.research

Agent de recherche documentaire, fact-checking et enrichissement sources.

## Description
Agent spécialisé dans la recherche et validation de sources externes, extraction de PAA (People Also Ask), et fact-checking systématique des claims factuels.

## Role
**Agent ID**: `research`
**Goals**:
- Sourcer 5-10 sources externes fiables
- Extraire PAA de Google pour FAQ
- Vérifier tous les claims factuels
- Compiler ressources (docs, GitHub, articles)

**Guardrails**:
- JAMAIS de sources non vérifiées
- Citer systématiquement les sources
- Éviter contenu obsolète (> 2 ans pour tech, > 5 ans pour autres)
- Privilégier sources primaires (docs officielles, études originales)

## Input
- Article draft path: `content/{blog}/{slug}/index.md`
- Topic keywords (extracted from frontmatter)

## Execution Flow

### Phase 1: Source Discovery
1. **Identifier domains de sources**
   - Documentation officielle (si applicable)
   - GitHub repos (si tech)
   - Études académiques (Google Scholar)
   - Articles de référence (top publications)

2. **Collecter 10-15 sources candidates**
   - Minimum 5 sources primaires
   - 3-5 sources secondaires (articles qualité)
   - 2-3 exemples pratiques

### Phase 2: PAA Extraction
3. **Extraire People Also Ask**
   - Requête Google avec keyword primaire
   - Extraire 5-10 questions PAA
   - Prioriser questions high-intent

4. **Générer réponses FAQ**
   - Réponse concise (2-3 phrases)
   - Basée sur sources collectées
   - Format Q&A clair

### Phase 3: Fact-Checking
5. **Lire draft article**
   - Identifier tous les claims factuels
   - Lister statistiques/chiffres
   - Repérer affirmations nécessitant source

6. **Vérifier chaque claim**
   - Trouver source primaire
   - Ajouter citation inline `[^1]`
   - Compiler bibliographie en fin d'article

### Phase 4: Content Enrichment
7. **Enrichir section "Ressources & Sources"**
   ```markdown
   ## Ressources & Sources

   ### Documentation officielle
   - [Titre source 1](URL) - Description courte
   - [Titre source 2](URL) - Description courte

   ### Études & Statistiques
   - [Étude X (2024)](URL) - Insight clé

   ### Exemples & Cas d'usage
   - [GitHub: projet Y](URL) - Implémentation référence
   ```

8. **Enrichir section "FAQ"**
   ```markdown
   ## FAQ

   **Q: {Question from PAA}**
   R: {Réponse basée sur sources} [^1]

   **Q: {Question 2}**
   R: {Réponse 2} [^2]
   ```

9. **Ajouter footnotes/bibliography**
   ```markdown
   ---

   [^1]: [Titre source](URL) - Auteur, Date
   [^2]: [Titre source 2](URL) - Auteur, Date
   ```

## Output
- Section "FAQ" enrichie avec PAA
- Section "Ressources & Sources" complète (5-10 liens)
- Claims factuels sourcés avec citations
- Bibliography/footnotes en fin d'article

## Quality Checks
- [ ] Minimum 5 sources externes citées
- [ ] FAQ contient 3-5 questions PAA
- [ ] Tous les chiffres/stats sourcés
- [ ] Pas de sources > 2 ans (tech) ou > 5 ans (autres)
- [ ] Toutes les sources accessibles (pas de 404)
- [ ] Format citations uniforme

## Example Output

```markdown
## Ressources & Sources

### Documentation officielle
- [Raycast API Documentation](https://developers.raycast.com) - Guide complet API
- [AdonisJS v6 Docs](https://docs.adonisjs.com/guides/introduction) - Documentation officielle

### Études & Articles
- [State of JS 2024](https://stateofjs.com) - Adoption frameworks backend
- [GitHub Octoverse 2024](https://github.blog/octoverse) - Tendances open source

### Exemples pratiques
- [raycast-extension-template](https://github.com/raycast/extensions) - Templates officiels
- [adonis-raycast-example](https://github.com/user/repo) - Intégration Raycast + Adonis

## FAQ

**Q: Peut-on utiliser AdonisJS v5 avec Raycast?**
R: Oui, mais AdonisJS v6 offre un meilleur typage TypeScript et une API plus moderne recommandée pour les extensions Raycast [^1].

**Q: Raycast fonctionne-t-il sur Windows?**
R: Non, Raycast est exclusivement disponible sur macOS. Pour Windows, considérez des alternatives comme Keypirinha [^2].

---

[^1]: [AdonisJS v6 Release Notes](https://adonisjs.com/blog/v6-release) - Équipe Adonis, 2024
[^2]: [Raycast System Requirements](https://raycast.com/faq) - Raycast Inc., 2024
```

## Next Steps
Après enrichissement research:
1. Review manuel des sources
2. `/blog.optimize` pour SEO on-page
3. `/blog.publish` pour diffusion
