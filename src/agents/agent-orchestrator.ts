import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { BlogSpec } from '../schemas/blog.schema';
import { BaseAgent } from './base-agent';
import { SEOSpecialistAgent } from './seo-specialist';
import { ResearchIntelligenceAgent } from './research-intelligence';
import { MarketingSpecialistAgent } from './marketing-specialist';

export interface OrchestrationResult {
  success: boolean;
  articlePath: string;
  agentResults: Array<{
    agent: string;
    success: boolean;
    summary: string;
    metrics?: Record<string, any>;
  }>;
  summary: string;
}

export class AgentOrchestrator {
  private agents: Map<string, BaseAgent>;

  constructor() {
    this.agents = new Map();
    this.registerAgent(new SEOSpecialistAgent());
    this.registerAgent(new ResearchIntelligenceAgent());
    this.registerAgent(new MarketingSpecialistAgent());
  }

  private registerAgent(agent: BaseAgent): void {
    this.agents.set(agent.role, agent);
  }

  async orchestrate(
    topic: string,
    agentRoles: Array<'seo' | 'research' | 'marketing'> = ['research', 'seo', 'marketing']
  ): Promise<OrchestrationResult> {
    console.log(`\n🚀 Starting orchestration for: "${topic}"\n`);

    // 1. Load spec
    const specPath = join(process.cwd(), '.spec', 'blog.spec.json');
    const spec: BlogSpec = JSON.parse(readFileSync(specPath, 'utf-8'));

    // 2. Find article path
    const articlePath = this.findArticlePath(spec, topic);
    if (!articlePath) {
      throw new Error('Article not found. Run `blog-spec generate` first.');
    }

    console.log(`📄 Article path: ${articlePath}\n`);

    // 3. Load article content
    let articleContent = readFileSync(articlePath, 'utf-8');

    const agentResults: OrchestrationResult['agentResults'] = [];

    // 4. Execute agents sequentially
    for (const role of agentRoles) {
      const agent = this.agents.get(role);
      if (!agent) {
        console.warn(`⚠️  Agent ${role} not found, skipping...`);
        continue;
      }

      console.log(`\n${'='.repeat(60)}`);
      console.log(`🤖 Executing: ${agent.name}`);
      console.log(`${'='.repeat(60)}\n`);

      try {
        const result = await agent.execute({
          spec,
          articlePath,
          articleContent,
          topic,
        });

        // Update content for next agent
        articleContent = result.updatedContent;

        agentResults.push({
          agent: agent.name,
          success: result.success,
          summary: result.summary,
          metrics: result.metrics,
        });

        console.log(`\n${result.summary}\n`);
      } catch (error) {
        console.error(`❌ Agent ${agent.name} failed:`, error);
        agentResults.push({
          agent: agent.name,
          success: false,
          summary: `Failed: ${(error as Error).message}`,
        });
      }
    }

    // 5. Write final content
    writeFileSync(articlePath, articleContent, 'utf-8');
    console.log(`\n✅ Article updated: ${articlePath}\n`);

    // 6. Generate summary
    const summary = this.generateOrchestrationSummary(agentResults);

    return {
      success: agentResults.every(r => r.success),
      articlePath,
      agentResults,
      summary,
    };
  }

  private findArticlePath(spec: BlogSpec, topic: string): string | null {
    const slugify = (text: string) =>
      text
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const blogSlug = slugify(spec.blog.name);
    const articleSlug = slugify(topic);

    const articlePath = join(
      process.cwd(),
      'content',
      blogSlug,
      articleSlug,
      'index.md'
    );

    try {
      readFileSync(articlePath, 'utf-8');
      return articlePath;
    } catch {
      return null;
    }
  }

  private generateOrchestrationSummary(
    results: OrchestrationResult['agentResults']
  ): string {
    const successCount = results.filter(r => r.success).length;
    const totalAgents = results.length;

    const parts = [
      '📊 Orchestration Complete',
      '',
      `**Success Rate**: ${successCount}/${totalAgents} agents`,
      '',
      '**Agent Results:**',
    ];

    results.forEach(result => {
      const status = result.success ? '✅' : '❌';
      parts.push(`${status} ${result.agent}`);
    });

    parts.push('', '**Next Steps:**');
    parts.push('1. Review the updated article');
    parts.push('2. Manually verify all recommendations');
    parts.push('3. Test all links and CTAs');
    parts.push('4. Run `blog-spec validate` to check spec');
    parts.push('5. Publish when ready');

    return parts.join('\n');
  }
}
