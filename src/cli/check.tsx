import React from 'react';
import { render, Box, Text } from 'ink';
import { execSync } from 'child_process';
import gradient from 'gradient-string';

interface Tool {
  name: string;
  command: string;
  description: string;
}

const tools: Tool[] = [
  { name: 'Claude Code', command: 'claude --version', description: 'Claude CLI' },
  { name: 'GitHub Copilot', command: 'gh copilot --version', description: 'GitHub Copilot CLI' },
  { name: 'Git', command: 'git --version', description: 'Version control' },
  { name: 'Node.js', command: 'node --version', description: 'JavaScript runtime' },
  { name: 'Bun', command: 'bun --version', description: 'JavaScript runtime & toolkit' },
];

function checkTool(tool: Tool): { available: boolean; version?: string } {
  try {
    const output = execSync(tool.command, { encoding: 'utf-8', stdio: 'pipe' });
    return { available: true, version: output.trim() };
  } catch {
    return { available: false };
  }
}

export async function checkCommand() {
  const results = tools.map((tool) => ({
    ...tool,
    ...checkTool(tool),
  }));

  render(
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold>{gradient.pastel.multiline('🔍 Vérification des outils disponibles')}</Text>
      </Box>
      <Box flexDirection="column" marginLeft={2}>
        {results.map((result, i) => (
          <Box key={i} marginBottom={0}>
            <Text>
              {result.available ? (
                <Text color="green">✓</Text>
              ) : (
                <Text color="red">✗</Text>
              )}{' '}
              <Text bold>{result.name}</Text>
              {result.version && <Text dimColor> ({result.version})</Text>}
            </Text>
          </Box>
        ))}
      </Box>
      <Box marginTop={1}>
        <Text dimColor>
          {results.filter((r) => r.available).length}/{results.length} outils disponibles
        </Text>
      </Box>
    </Box>
  );

  setTimeout(() => process.exit(0), 100);
}
