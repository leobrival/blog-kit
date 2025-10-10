import React from 'react';
import { render, Box, Text } from 'ink';
import { readFileSync } from 'fs';
import { join } from 'path';
import { BlogSpecSchema } from '../schemas/blog.schema';
import gradient from 'gradient-string';

export async function validateCommand() {
  try {
    const specPath = join(process.cwd(), '.spec', 'blog.spec.json');
    const specContent = readFileSync(specPath, 'utf-8');
    const spec = JSON.parse(specContent);

    // Validate with Zod
    const result = BlogSpecSchema.safeParse(spec);

    if (result.success) {
      render(
        <Box flexDirection="column" padding={1}>
          <Box marginBottom={1}>
            <Text bold>{gradient.pastel.multiline('✅ Spécification valide!')}</Text>
          </Box>
          <Box flexDirection="column" marginLeft={2}>
            <Text>✓ Schéma JSON valide</Text>
            <Text>✓ {result.data.workflow.agents.length} agents configurés</Text>
            <Text>✓ {result.data.content_model.blocks.filter(b => b.active).length} blocs de contenu actifs</Text>
            <Text>✓ {result.data.blog.languages.length} langue(s): {result.data.blog.languages.join(', ')}</Text>
          </Box>
        </Box>
      );
      setTimeout(() => process.exit(0), 100);
    } else {
      render(
        <Box flexDirection="column" padding={1}>
          <Box marginBottom={1}>
            <Text color="red" bold>❌ Spécification invalide</Text>
          </Box>
          <Box flexDirection="column" marginLeft={2}>
            {result.error.errors.map((err, i) => (
              <Text key={i} color="red">
                • {err.path.join('.')}: {err.message}
              </Text>
            ))}
          </Box>
        </Box>
      );
      setTimeout(() => process.exit(1), 100);
    }
  } catch (error) {
    render(
      <Box flexDirection="column" padding={1}>
        <Text color="red">❌ Erreur: {(error as Error).message}</Text>
        <Text dimColor>Fichier .spec/blog.spec.json introuvable ou invalide.</Text>
      </Box>
    );
    setTimeout(() => process.exit(1), 100);
  }
}
