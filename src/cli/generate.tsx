import React from 'react';
import { render, Box, Text } from 'ink';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { BlogSpec } from '../schemas/blog.schema';
import { slugify } from '../utils/slugify';
import gradient from 'gradient-string';

export async function generateCommand() {
  try {
    // Read spec
    const specPath = join(process.cwd(), '.spec', 'blog.spec.json');
    const spec: BlogSpec = JSON.parse(readFileSync(specPath, 'utf-8'));

    const root = 'content';
    const blogDir = join(root, slugify(spec.blog.name));
    mkdirSync(blogDir, { recursive: true });

    // Generate Claude.md (brief éditorial)
    const claudeBrief = `# Ligne éditoriale – ${spec.blog.name}

## Contexte
${spec.blog.context}

## Objectif
${spec.blog.objective}

## Ton
${spec.blog.tone}

## Règles de marque
**Do:** ${spec.blog.brand_rules.voice_do.join(', ')}
**Don't:** ${spec.blog.brand_rules.voice_dont.join(', ')}

## Workflow multi-agents
${spec.workflow.agents.map((a) => `- **${a.id}**: ${a.goals.join(', ')}`).join('\n')}

## Review rules
- Must-have: ${spec.workflow.review_rules.must_have.join(', ')}
- Must-avoid: ${spec.workflow.review_rules.must_avoid.join(', ')}
`;
    writeFileSync(join(blogDir, 'Claude.md'), claudeBrief);

    // Generate article template
    const articleDir = join(blogDir, slugify(spec.article_template.topic));
    mkdirSync(articleDir, { recursive: true });

    const frontmatter = `---
title: "${spec.article_template.topic}"
lang: "${spec.blog.languages[0] || 'fr'}"
description: "${spec.article_template.search_intent_response}"
draft: true
agents: ["copywriter","seo","research","marketing"]
---`;

    const skeleton = `${frontmatter}

# ${spec.article_template.topic}

> Intention de recherche: ${spec.article_template.search_intent_response}

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
${spec.content_model.blocks.some((b) => b.type === 'information_table' && b.active) ? '| Col1 | Col2 |\n|---|---|\n| x | y |\n' : '_(pas de tableau requis)_'}

## Liens
${spec.content_model.blocks.some((b) => b.type === 'links' && b.active) ? '- [Ressource 1](#)\n- [Ressource 2](#)\n' : '_(pas de liens)_'}

## FAQ
${spec.content_model.blocks.some((b) => b.type === 'faq' && b.active) ? '- **Q:** …  \n  **R:** …\n' : '_(pas de FAQ)_'}

## Sources externes
${spec.content_model.blocks.some((b) => b.type === 'external_sources' && b.active) ? '- Source A\n- Source B\n' : '_(pas de sources)_'}

## À éviter
${spec.article_template.information_to_avoid || '_(rien de spécifique)_'}

<!-- Infos supplémentaires -->
<!-- ${spec.article_template.additional_information || ''} -->
`;

    writeFileSync(join(articleDir, 'index.md'), skeleton);

    render(
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Text bold>{gradient.pastel.multiline('✨ Structure générée avec succès!')}</Text>
        </Box>
        <Box flexDirection="column" marginLeft={2}>
          <Text>📁 Brief éditorial: <Text color="cyan">{join(blogDir, 'Claude.md')}</Text></Text>
          <Text>📝 Article template: <Text color="cyan">{join(articleDir, 'index.md')}</Text></Text>
        </Box>
      </Box>
    );

    setTimeout(() => process.exit(0), 100);
  } catch (error) {
    render(
      <Box flexDirection="column" padding={1}>
        <Text color="red">❌ Erreur: {(error as Error).message}</Text>
        <Text dimColor>Assurez-vous d'avoir exécuté `blog-spec init` d'abord.</Text>
      </Box>
    );
    setTimeout(() => process.exit(1), 100);
  }
}
