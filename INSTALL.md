# Installation Guide

Guide complet pour installer Blog Kit dans Claude Code.

## Méthode 1: Installation depuis GitHub (Recommandée)

### 1. Ajouter le Plugin au Marketplace

```bash
/plugin marketplace add https://github.com/leobrival/blog-kit.git
```

Cette commande ajoute le dépôt GitHub au marketplace local de Claude Code.

**Note**: Utilise l'URL HTTPS complète pour éviter les problèmes de clés SSH.

### 2. Installer le Plugin

```bash
/plugin install blog-kit
```

Cette commande installe:
-  **Commands** (`commands/*.md`) - Toutes les commandes slash
-  **Agents** (`agents/*.md`) - Tous les agents spécialisés
-  **Templates** (`.templates/`) - Système de templates JSON

### 3. Vérifier l'Installation

```bash
# Vérifier que le plugin est installé
/plugin list

# Tester une commande
/blog-setup
```

Si la commande `/blog-setup` s'exécute, l'installation est réussie!

## Méthode 2: Installation Locale (Développement)

Si vous développez le plugin ou voulez tester des modifications locales:

### 1. Cloner le Dépôt

```bash
cd ~/Developer  # ou votre répertoire de projets
git clone https://github.com/leobrival/blog-kit.git
cd blog-kit
```

### 2. Créer un Lien Symbolique

```bash
# Créer le lien depuis le répertoire des plugins Claude Code
/plugin link ~/Developer/blog-kit
```

### 3. Vérifier le Lien

```bash
/plugin list
```

Le plugin devrait apparaître avec le tag `[local]`.

## Que Contient l'Installation?

Après installation, vous aurez accès à:

###  Structure Installée

```
~/.claude/plugins/blog-kit/
├── commands/                 # 12 commandes slash
│   ├── blog-setup.md
│   ├── blog-analyse.md
│   ├── blog-personas.md          # Persona management ✅ NEW
│   ├── blog-generate.md
│   ├── blog-research.md
│   ├── blog-seo.md
│   ├── blog-geo.md
│   ├── blog-marketing.md
│   ├── blog-copywrite.md
│   ├── blog-optimize.md
│   ├── blog-optimize-images.md
│   └── blog-translate.md
│
├── agents/                   # 9 agents spécialisés (100% ACTION)
│   ├── research-intelligence.md    # Generates article draft ✅
│   ├── seo-specialist.md          # Generates SEO brief ✅
│   ├── geo-specialist.md          # Generates GEO brief ✅
│   ├── marketing-specialist.md    # Generates final article ✅
│   ├── copywriter.md              # Generates spec-compliant article ✅
│   ├── quality-optimizer.md       # Auto-fixes article issues ✅
│   ├── translator.md              # Generates translated articles ✅
│   ├── analyzer.md                # Batch updates articles + configs ✅
│   └── persona-specialist.md      # Creates audience personas ✅ NEW
│
└── .templates/              # Système de templates JSON
    ├── registry.json        # Catalogue des templates
    ├── schemas/             # JSON Schema (6 fichiers)
    ├── types/               # Templates (tutorial, guide, comparison)
    └── components/          # Composants (8 fichiers)
```

###  Commandes Disponibles

Après installation, tapez `/blog-` puis Tab pour voir toutes les commandes:

- `/blog-setup` - Configuration interactive
- `/blog-analyse` - Analyser le contenu existant
- `/blog-personas` - Créer/gérer les personas d'audience ✅ NEW
- `/blog-generate` - Workflow complet (Research → SEO → GEO → Marketing)
- `/blog-research` - Phase de recherche uniquement
- `/blog-seo` - Optimisation SEO (moteurs traditionnels)
- `/blog-geo` - Optimisation GEO (IA: ChatGPT, Perplexity)
- `/blog-marketing` - Création de contenu
- `/blog-copywrite` - Rédaction spec-driven
- `/blog-optimize` - Validation qualité
- `/blog-optimize-images` - Compression d'images (WebP)
- `/blog-translate` - Validation i18n et traduction

## Première Utilisation

### Quick Start (5 minutes)

```bash
# 0. Installer le plugin
/plugin marketplace add https://github.com/leobrival/blog-kit.git
/plugin install blog-kit

# 1. Configurer votre blog
/blog-setup

# 2. Générer votre premier article
/blog-generate "Your article topic"
```

### Workflow Complet (30-45 minutes) - 100% ACTION

```bash
# 1. Analyser votre blog existant (batch update articles ✅)
/blog-analyse

# 2. Recherche approfondie (génère draft ✅)
/blog-research "nodejs tracing"
# Output: articles/nodejs-tracing-draft.md

# 3. Optimisation SEO (génère brief ✅)
/blog-seo "nodejs tracing"
# Output: .specify/seo/nodejs-tracing-seo-brief.md

# 4. Optimisation GEO (génère brief GEO ✅)
/blog-geo "nodejs tracing"
# Output: .specify/geo/nodejs-tracing-geo-brief.md

# 5. Création de contenu (génère article final ✅)
/blog-marketing "nodejs tracing"
# Output: articles/nodejs-tracing.md

# 6. Validation qualité (auto-fixe issues ✅)
/blog-optimize "nodejs-tracing"
# Output: articles/nodejs-tracing.md (corrected)
```

**Tous les agents produisent du contenu actionnable** - pas seulement de l'analyse!

## Configuration Requise

### Outils Claude Code

Le plugin nécessite que ces outils soient disponibles:

-  **WebSearch** - Pour la recherche (agent research-intelligence)
-  **WebFetch** - Pour récupérer les sources
-  **Read/Write/Edit** - Pour manipuler les fichiers
-  **Bash** - Pour les opérations sur fichiers

Ces outils sont normalement activés par défaut dans Claude Code.

### Dépendances Système (Optionnelles)

Pour l'optimisation d'images (`/blog-optimize-images`):

- **ImageMagick** ou **Sharp** (via npm)
- Pour installer: `brew install imagemagick` (macOS)

## Vérification de l'Installation

### Test Complet

```bash
# 1. Vérifier que le plugin est installé
/plugin list | grep blog-kit

# 2. Tester la commande de setup
/blog-setup

# 3. Vérifier les agents
# L'agent sera chargé automatiquement lors de l'exécution d'une commande

# 4. Vérifier les templates
ls ~/.claude/plugins/blog-kit/.templates/
```

### Vérifier les Templates

Les templates doivent être présents:

```bash
# Vérifier la structure
ls -R ~/.claude/plugins/blog-kit/.templates/

# Devrait afficher:
# registry.json
# schemas/ (6 fichiers)
# types/ (3 templates)
# components/ (8 composants)
```

## Structure de Votre Projet

Après la première utilisation, votre projet aura cette structure:

```
your-blog/
├── .spec/                    # Constitution du blog (généré par /blog-setup)
│   ├── blog.spec.json
│   └── personas/            # Personas d'audience ✅ NEW
│       ├── schema.json
│       ├── registry.json
│       └── *.json
│
├── .specify/                 # Artefacts générés (100% ACTIONABLE)
│   ├── research/            # Rapports de recherche
│   ├── seo/                 # Briefs SEO ✅
│   ├── geo/                 # Briefs GEO ✅
│   ├── quality/             # Changelogs auto-fix ✅
│   └── personas/            # Guides de ciblage persona ✅ NEW
│
└── articles/                # Articles finaux (structure i18n)
    ├── en/
    │   ├── tutorials/
    │   │   ├── .category.json
    │   │   └── nodejs-tracing/
    │   │       ├── article.md        # Final article ✅
    │   │       └── images/
    │   ├── nodejs-tracing-draft.md   # Research draft ✅
    │   └── comparisons/
    └── fr/
```

## Mise à Jour du Plugin

### Mettre à Jour depuis GitHub

```bash
# Mettre à jour vers la dernière version
/plugin update blog-kit
```

### Vérifier la Version

```bash
# Afficher les informations du plugin
/plugin info blog-kit
```

Vous devriez voir:
- **Version**: 0.2.0 ou supérieure
- **Templates**:  Inclus

## Désinstallation

Si vous voulez désinstaller le plugin:

```bash
# Désinstaller le plugin
/plugin uninstall blog-kit

# Retirer du marketplace (optionnel)
/plugin marketplace remove leobrival/blog-kit
```

**Note**: Cela ne supprimera PAS vos articles générés dans `articles/` ou vos configurations dans `.spec/`.

## Résolution de Problèmes

### "Marketplace not found" ou "SSH authentication failed"

**Erreur 1**: `Marketplace "https://github.com/..." not found`
**Erreur 2**: `SSH authentication failed` ou `Permission denied (publickey)`

**Cause**:
- Erreur 1: Tentative d'installation directe sans ajouter au marketplace
- Erreur 2: Claude Code essaie d'utiliser SSH mais vos clés SSH ne sont pas configurées

**Solution**: Toujours ajouter au marketplace d'abord, puis installer:

```bash
#  NE PAS faire ceci
/plugin install https://github.com/leobrival/blog-kit.git

#  FAIRE ceci (en 2 étapes)
/plugin marketplace add https://github.com/leobrival/blog-kit.git
/plugin install blog-kit
```

**Important**: Utilisez toujours l'URL HTTPS complète, pas le raccourci `owner/repo`.

### "Command not found: /blog-setup"

**Solution**: Le plugin n'est pas installé correctement.

```bash
# Réinstaller
/plugin uninstall blog-kit
/plugin marketplace add https://github.com/leobrival/blog-kit.git
/plugin install blog-kit
```

### "Templates not found"

**Solution**: Les templates ne sont pas installés.

```bash
# Vérifier la version
/plugin info blog-kit

# Si version < 0.2.0, mettre à jour
/plugin update blog-kit
```

### "Agent failed to load"

**Solution**: L'agent n'est pas trouvé ou est corrompu.

```bash
# Vérifier l'installation
ls ~/.claude/plugins/blog-kit/agents/

# Réinstaller si nécessaire
/plugin reinstall blog-kit
```

## Support

- **Documentation**: [README.md](./README.md)
- **Template System**: [.templates/README.md](./.templates/README.md)
- **Issues**: [GitHub Issues](https://github.com/leobrival/blog-kit/issues)
- **Discussions**: [GitHub Discussions](https://github.com/leobrival/blog-kit/discussions)

## Prochaines Étapes

Après installation:

1.  Lire le [README.md](./README.md) pour comprendre l'architecture
2.  Explorer [.templates/README.md](./.templates/README.md) pour le système de templates
3.  Générer votre premier article avec `/blog-generate`
4.  Personnaliser avec vos propres templates et catégories

Bon blogging! 
