import type { Block } from '../schemas/blog.schema';

export const DEFAULT_BLOCKS: Block[] = [
  { type: 'faq', active: true, description: 'Q/R fréquentes', required: true },
  { type: 'bullet_list', active: true, description: 'Listes à puces', required: false },
  { type: 'summary', active: true, description: 'Sommaire', required: true },
  { type: 'external_sources', active: true, description: 'Sources externes', required: true },
  { type: 'content_images', active: true, description: 'Images dans le contenu', required: false },
  { type: 'links', active: true, description: 'Liens internes/externes', required: true },
  { type: 'information_table', active: true, description: 'Tableau d\'informations', required: false },
  { type: 'audio', active: false, description: 'Fichiers audio', required: false },
  { type: 'audio_summary', active: false, description: 'Résumé audio', required: false },
  { type: 'social_networks', active: true, description: 'Réseaux sociaux/partage', required: false },
];
