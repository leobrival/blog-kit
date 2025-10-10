#!/bin/bash

# Demo script pour tester le CLI avec des valeurs par défaut

echo "🎬 Démo: blog-spec init avec valeurs par défaut"
echo ""

# Simuler les réponses (toutes vides = valeurs par défaut)
(
  echo ""  # Nom du blog
  echo ""  # Contexte
  echo ""  # Objectif
  echo ""  # Tone
  echo ""  # Languages
  echo ""  # Voice DO
  echo ""  # Voice DON'T
  echo ""  # Topic
  echo ""  # Search intent
  echo ""  # Additional info
  echo ""  # Info to avoid
) | bun run src/index.tsx init

echo ""
echo "✅ Démo terminée!"
echo ""
echo "Fichiers générés:"
echo "  - .spec/blog.spec.json"
echo ""
echo "Commandes suivantes:"
echo "  bun run dev generate"
echo "  bun run dev validate"
