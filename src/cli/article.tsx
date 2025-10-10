import React from 'react';
import { render, Box, Text } from 'ink';
import { AgentOrchestrator } from '../agents/agent-orchestrator';
import gradient from 'gradient-string';

interface ArticleCommandProps {
  topic: string;
  agents?: string;
}

export async function articleCommand({ topic, agents = 'all' }: ArticleCommandProps) {
  render(
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold>{gradient.pastel.multiline('🚀 Article Generation Workflow')}</Text>
      </Box>
      <Box marginBottom={1}>
        <Text dimColor>Topic: {topic}</Text>
      </Box>
      <Box marginBottom={1}>
        <Text color="gray">{'─'.repeat(60)}</Text>
      </Box>
    </Box>
  );

  try {
    // Determine which agents to run
    const agentRoles = agents === 'all'
      ? ['research', 'seo', 'marketing'] as const
      : agents.split(',').map(a => a.trim()) as any;

    // Run orchestrator
    const orchestrator = new AgentOrchestrator();
    const result = await orchestrator.orchestrate(topic, agentRoles);

    // Render final results
    render(
      <Box flexDirection="column" padding={1}>
        <Box marginTop={1} marginBottom={1}>
          <Text color="gray">{'─'.repeat(60)}</Text>
        </Box>
        <Box marginBottom={1}>
          <Text bold color={result.success ? 'green' : 'red'}>
            {result.success ? '✅ Success!' : '⚠️  Completed with warnings'}
          </Text>
        </Box>
        <Box flexDirection="column" marginLeft={2}>
          <Text dimColor>Article: {result.articlePath}</Text>
          <Box marginTop={1}>
            <Text>Agents executed: {result.agentResults.length}</Text>
          </Box>
          {result.agentResults.map((agent, i) => (
            <Box key={i}>
              <Text color={agent.success ? 'green' : 'red'}>
                {agent.success ? '✓' : '✗'}
              </Text>
              <Text> {agent.agent}</Text>
            </Box>
          ))}
        </Box>
        <Box marginTop={2} flexDirection="column">
          <Text bold>Next Steps:</Text>
          <Box marginLeft={2} flexDirection="column">
            <Text>1. Review the updated article</Text>
            <Text>2. Manually verify recommendations</Text>
            <Text>3. Test all links and CTAs</Text>
            <Text>4. Publish when ready</Text>
          </Box>
        </Box>
      </Box>
    );

    setTimeout(() => process.exit(result.success ? 0 : 1), 100);
  } catch (error) {
    render(
      <Box flexDirection="column" padding={1}>
        <Text color="red">❌ Error: {(error as Error).message}</Text>
        <Text dimColor>Make sure you've run `blog-spec generate` first.</Text>
      </Box>
    );
    setTimeout(() => process.exit(1), 100);
  }
}
