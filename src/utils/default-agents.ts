import type { Agent } from '../schemas/blog.schema';

export const DEFAULT_AGENTS: Agent[] = [
  {
    id: 'copywriter',
    role: 'copywriter',
    goals: ['Clarté', 'Structure logique', 'CTA clair', 'Tone cohérent'],
    guardrails: ['Pas de jargon sans explication', 'Phrases courtes (<25 mots)'],
  },
  {
    id: 'seo',
    role: 'seo',
    goals: ['SERP intent match', 'Balises H1-H6 optimisées', 'Interlinking', 'Meta descriptions'],
    guardrails: ['Pas de keyword stuffing', 'Densité keyword naturelle'],
  },
  {
    id: 'research',
    role: 'research',
    goals: ['Sources fiables', 'Faits vérifiés', 'Citations', 'PAA intégré'],
    guardrails: ['Jamais de sources non vérifiées', 'Citer systématiquement'],
  },
  {
    id: 'marketing',
    role: 'marketing',
    goals: ['Alignement offre', 'CTA stratégique', 'Diffusion cross-canal'],
    guardrails: ['Pas de promesses non vérifiées', 'Transparence'],
  },
];
