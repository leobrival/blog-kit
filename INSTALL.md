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
- ✅ **Commands** (`commands/*.md`) - Toutes les commandes slash
- ✅ **Agents** (`agents/*.md`) - Tous les agents spécialisés
- ✅ **Templates** (`.templates/`) - Système de templates JSON

### 3. Vérifier l'Installation

```bash
/plugin list
```

Vous devriez voir `blog-kit` dans la liste des plugins installés.

### 4. Tester une Commande

```bash
/blog-setup
```

Si la commande s'exécute, l'installation est réussie!

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

### 📂 Structure Installée

```
~/.claude/plugins/blog-kit/
├── commands/                 # 11 commandes slash
│   ├── blog-setup.md
│   ├── blog-analyse.md
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
├── agents/                   # 8 agents spécialisés
│   ├── research-intelligence.md
│   ├── seo-specialist.md
│   ├── geo-specialist.md
│   ├── marketing-specialist.md
│   ├── copywriter.md
│   ├── quality-optimizer.md
│   ├── translator.md
│   └── analyzer.md
│
└── .templates/              # Système de templates JSON
    ├── registry.json        # Catalogue des templates
    ├── schemas/             # JSON Schema (6 fichiers)
    ├── types/               # Templates (tutorial, guide, comparison)
    └── components/          # Composants (8 fichiers)
```

### 🔧 Commandes Disponibles

Après installation, tapez `/blog-` puis Tab pour voir toutes les commandes:

- `/blog-setup` - Configuration interactive
- `/blog-analyse` - Analyser le contenu existant
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
# 0. Installer le plugin (si pas déjà fait)
/plugin marketplace add https://github.com/leobrival/blog-kit.git
/plugin install blog-kit

# 1. Configurer votre blog
/blog-setup

# 2. Générer votre premier article
/blog-generate "Your article topic"
```

### Workflow Complet (30-45 minutes)

```bash
# 1. Analyser votre blog existant (optionnel)
/blog-analyse

# 2. Recherche approfondie
/blog-research "nodejs tracing"

# 3. Optimisation SEO (moteurs traditionnels)
/blog-seo "nodejs tracing"

# 4. Optimisation GEO (IA search)
/blog-geo "nodejs tracing"

# 5. Création de contenu (utilise tous les briefs)
/blog-marketing "nodejs tracing"

# 6. Validation qualité
/blog-optimize "nodejs-tracing"
```

## Configuration Requise

### Outils Claude Code

Le plugin nécessite que ces outils soient disponibles:

- ✅ **WebSearch** - Pour la recherche (agent research-intelligence)
- ✅ **WebFetch** - Pour récupérer les sources
- ✅ **Read/Write/Edit** - Pour manipuler les fichiers
- ✅ **Bash** - Pour les opérations sur fichiers

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
│   └── blog.spec.json
│
├── .specify/                 # Artefacts générés
│   ├── research/            # Rapports de recherche
│   ├── seo/                 # Briefs SEO
│   ├── geo/                 # Briefs GEO
│   └── quality/             # Rapports de validation
│
└── articles/                # Articles finaux (structure i18n)
    ├── en/
    │   ├── tutorials/
    │   │   ├── .category.json
    │   │   └── nodejs-tracing/
    │   │       ├── article.md
    │   │       └── images/
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
- **Templates**: ✅ Inclus

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

### "SSH authentication failed" ou "Permission denied (publickey)"

**Erreur complète**:
```
Failed to clone marketplace repository: SSH authentication failed.
git@github.com: Permission denied (publickey).
```

**Cause**: Claude Code essaie d'utiliser SSH mais vos clés SSH ne sont pas configurées.

**Solution**: Utiliser l'URL HTTPS au lieu de SSH:

```bash
# ❌ Ne pas utiliser le raccourci
/plugin marketplace add leobrival/blog-kit

# ✅ Utiliser l'URL HTTPS complète
/plugin marketplace add https://github.com/leobrival/blog-kit.git
```

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

1. 📖 Lire le [README.md](./README.md) pour comprendre l'architecture
2. 🎨 Explorer [.templates/README.md](./.templates/README.md) pour le système de templates
3. 🚀 Générer votre premier article avec `/blog-generate`
4. 🎯 Personnaliser avec vos propres templates et catégories

Bon blogging! 🎉
