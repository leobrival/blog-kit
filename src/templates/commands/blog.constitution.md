# Command: /blog.constitution

Établir les principes éditoriaux et la constitution du blog.

## Description
Cette commande permet de définir ou mettre à jour la constitution éditoriale du blog, incluant les règles de marque, le ton, les objectifs et les guardrails pour les agents IA.

## Input
- `$BLOG_NAME` - Nom du blog
- `$CONTEXT` - Contexte (qui/quoi/pourquoi)
- `$OBJECTIVES` - Objectifs éditoriaux & business
- `$TONE` - Tonalité (expert/pédagogique/convivial/corporate)
- `$VOICE_DO` - Guidelines positives (ce qu'il faut faire)
- `$VOICE_DONT` - Guidelines négatives (ce qu'il faut éviter)

## Execution Flow

1. **Charger template constitution**
   - Lire `.spec/blog.spec.json` existant ou créer nouveau

2. **Définir voice guidelines**
   - Voice DO: Liste des pratiques éditoriales recommandées
   - Voice DON'T: Liste des pratiques à éviter

3. **Établir review rules**
   - Must-have: Éléments obligatoires dans chaque article
   - Must-avoid: Éléments interdits

4. **Configurer agents workflow**
   - Copywriter: Clarté, structure, CTA
   - SEO: SERP intent, balises, interlinking
   - Research: Sources fiables, fact-checking
   - Marketing: Alignement offre, diffusion

5. **Valider contre business goals**
   - Vérifier cohérence objectifs/tone/guidelines
   - Assurer testabilité des principes

6. **Écrire constitution**
   - Sauvegarder `.spec/blog.spec.json`
   - Générer `content/{blog}/Claude.md` (brief agents)

## Output
- Constitution créée: `.spec/blog.spec.json`
- Brief agents: `content/{blog}/Claude.md`
- Validation: Principes déclaratifs et testables

## Validation Requirements
- Pas de tokens [] non expliqués
- Semantic versioning pour updates
- Principes déclaratifs et mesurables
- Format Markdown préservé

## Next Steps
Après création de la constitution:
1. Exécuter `/blog.specify` pour créer premier article
2. Valider avec `blog-spec validate`
3. Générer structure avec `blog-spec generate`
