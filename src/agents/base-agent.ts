import type { BlogSpec } from '../schemas/blog.schema';

export interface AgentContext {
  spec: BlogSpec;
  articlePath: string;
  articleContent: string;
  topic: string;
}

export interface AgentResult {
  success: boolean;
  updatedContent: string;
  summary: string;
  metrics?: Record<string, any>;
  warnings?: string[];
  recommendations?: string[];
}

export abstract class BaseAgent {
  abstract name: string;
  abstract role: 'copywriter' | 'seo' | 'research' | 'marketing';
  abstract description: string;

  abstract execute(context: AgentContext): Promise<AgentResult>;

  protected log(message: string): void {
    console.log(`[${this.name}] ${message}`);
  }

  protected warn(message: string): void {
    console.warn(`[${this.name}] ⚠️  ${message}`);
  }

  protected error(message: string): void {
    console.error(`[${this.name}] ❌ ${message}`);
  }
}
