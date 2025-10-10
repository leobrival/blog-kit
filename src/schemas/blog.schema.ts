import { z } from 'zod';

export const BlockSchema = z.object({
  type: z.enum([
    'faq',
    'bullet_list',
    'summary',
    'external_sources',
    'content_images',
    'links',
    'information_table',
    'audio',
    'audio_summary',
    'social_networks',
  ]),
  active: z.boolean(),
  description: z.string(),
  required: z.boolean().default(false),
});

export const AgentSchema = z.object({
  id: z.string(),
  role: z.enum(['copywriter', 'seo', 'research', 'marketing']),
  goals: z.array(z.string()),
  guardrails: z.array(z.string()).optional(),
});

export const BlogSpecSchema = z.object({
  blog: z.object({
    name: z.string(),
    context: z.string().describe('Qui sommes-nous, pour qui, pourquoi maintenant ?'),
    objective: z.string().describe('Objectifs éditoriaux & business'),
    tone: z.enum(['expert', 'pédagogique', 'convivial', 'corporate']),
    languages: z.array(z.string()).default(['fr']),
    brand_rules: z.object({
      voice_do: z.array(z.string()),
      voice_dont: z.array(z.string()),
    }),
  }),
  workflow: z.object({
    agents: z.array(AgentSchema),
    review_rules: z.object({
      must_have: z.array(z.string()),
      must_avoid: z.array(z.string()),
    }),
  }),
  content_model: z.object({
    blocks: z.array(BlockSchema),
  }),
  article_template: z.object({
    topic: z.string(),
    search_intent_response: z.string(),
    additional_information: z.string().optional(),
    information_to_avoid: z.string().optional(),
  }),
});

export type BlogSpec = z.infer<typeof BlogSpecSchema>;
export type Agent = z.infer<typeof AgentSchema>;
export type Block = z.infer<typeof BlockSchema>;
