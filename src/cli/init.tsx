import React from 'react';
import { render, Box, Text } from 'ink';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { InitForm } from '../components/InitForm';
import type { BlogSpec } from '../schemas/blog.schema';
import gradient from 'gradient-string';

export async function initCommand() {
  const { waitUntilExit } = render(
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold>{gradient.pastel.multiline('🚀 Blog Spec Kit - Initialisation')}</Text>
      </Box>
      <Text dimColor>Répondez aux questions pour créer votre spécification de blog.</Text>
      <Text dimColor>Appuyez sur Entrée pour utiliser les valeurs par défaut.</Text>
      <Box marginTop={1} marginBottom={1}>
        <Text color="gray">{'─'.repeat(60)}</Text>
      </Box>
      <InitForm
        onSubmit={(spec: BlogSpec) => {
          // Create .spec directory
          const specDir = join(process.cwd(), '.spec');
          mkdirSync(specDir, { recursive: true });

          // Write spec JSON
          const specPath = join(specDir, 'blog.spec.json');
          writeFileSync(specPath, JSON.stringify(spec, null, 2), 'utf-8');

          render(
            <Box flexDirection="column" padding={1}>
              <Box marginBottom={1}>
                <Text color="green">✔ Spécification créée avec succès!</Text>
              </Box>
              <Box marginBottom={1}>
                <Text dimColor>Fichier: {specPath}</Text>
              </Box>
              <Box flexDirection="column" marginTop={1}>
                <Text bold>Prochaines étapes:</Text>
                <Box marginLeft={2} flexDirection="column">
                  <Text>1. <Text color="cyan">blog-spec generate</Text> - Générer la structure Markdown</Text>
                  <Text>2. <Text color="cyan">blog-spec article "Votre sujet"</Text> - Créer un article complet</Text>
                  <Text>3. <Text color="cyan">blog-spec validate</Text> - Valider votre spécification</Text>
                </Box>
              </Box>
            </Box>
          );

          setTimeout(() => process.exit(0), 100);
        }}
      />
    </Box>
  );

  await waitUntilExit();
}
