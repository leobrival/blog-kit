import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { BlogSpec } from '../schemas/blog.schema';
import { DEFAULT_BLOCKS } from '../utils/default-blocks';
import { DEFAULT_AGENTS } from '../utils/default-agents';
import chalk from 'chalk';
import gradient from 'gradient-string';

const prompt = async (question: string, defaultValue: string = ''): Promise<string> => {
  const displayDefault = defaultValue ? chalk.dim(` (${defaultValue})`) : '';
  console.log(chalk.cyan(question) + displayDefault);
  process.stdout.write(chalk.green('→ '));

  // Read from stdin
  return new Promise((resolve) => {
    let input = '';
    process.stdin.setEncoding('utf8');

    const onData = (chunk: string) => {
      if (chunk.includes('\n')) {
        process.stdin.removeListener('data', onData);
        process.stdin.pause();
        const value = input + chunk.replace('\n', '');
        resolve(value.trim() || defaultValue);
      } else {
        input += chunk;
      }
    };

    process.stdin.on('data', onData);
    process.stdin.resume();
  });
};

export async function initCommandSimple() {
  console.log(gradient.pastel('🚀 Blog Spec Kit - Initialisation\n'));
  console.log(chalk.dim('Répondez aux questions pour créer votre spécification de blog.'));
  console.log(chalk.dim('Appuyez sur Entrée pour utiliser les valeurs par défaut.\n'));

  const name = await prompt('Nom du blog', 'Mon Blog');
  const context = await prompt('Contexte (qui/quoi/pourquoi)', 'Blog tech pour fondateurs et devs.');
  const objective = await prompt('Objectif principal', 'Générer des leads qualifiés via du contenu expert.');
  const tone = await prompt('Tonalité (expert/pédagogique/convivial/corporate)', 'pédagogique');
  const languages = await prompt('Langues (séparées par des virgules)', 'fr');
  const voice_do = await prompt('Voice DO (séparées par ;)', 'Clair;Actionnable;Sources citées');
  const voice_dont = await prompt('Voice DON\'T (séparées par ;)', 'Jargon inutile;Promesses non vérifiées');
  const topic = await prompt('Sujet d\'article par défaut', 'Guide: lancer une extension Raycast connectée à Adonis v6');
  const search_intent = await prompt('Réponse à l\'intention de recherche (1 phrase)', 'Un tutoriel étape par étape avec code et pièges à éviter.');
  const additional_info = await prompt('Infos supplémentaires (optionnel)', '');
  const info_avoid = await prompt('Infos à éviter (optionnel)', '');

  const spec: BlogSpec = {
    blog: {
      name,
      context,
      objective,
      tone: tone as any,
      languages: languages.split(',').map((l) => l.trim()).filter(Boolean),
      brand_rules: {
        voice_do: voice_do.split(';').map((s) => s.trim()).filter(Boolean),
        voice_dont: voice_dont.split(';').map((s) => s.trim()).filter(Boolean),
      },
    },
    workflow: {
      agents: DEFAULT_AGENTS,
      review_rules: {
        must_have: ['Sommaire clair', 'Sources externes citées', 'FAQ basée sur PAA'],
        must_avoid: ['Claims non sourcés', 'Keyword stuffing'],
      },
    },
    content_model: { blocks: DEFAULT_BLOCKS },
    article_template: {
      topic,
      search_intent_response: search_intent,
      additional_information: additional_info,
      information_to_avoid: info_avoid,
    },
  };

  // Create .spec directory
  const specDir = join(process.cwd(), '.spec');
  mkdirSync(specDir, { recursive: true });

  // Write spec JSON
  const specPath = join(specDir, 'blog.spec.json');
  writeFileSync(specPath, JSON.stringify(spec, null, 2), 'utf-8');

  console.log('\n' + chalk.green('✔ Spécification créée avec succès!'));
  console.log(chalk.dim('Fichier: ' + specPath));

  console.log('\n' + chalk.bold('Prochaines étapes:'));
  console.log('  1. ' + chalk.cyan('blog-spec generate') + ' - Générer la structure Markdown');
  console.log('  2. ' + chalk.cyan('blog-spec article "Votre sujet"') + ' - Créer un article complet');
  console.log('  3. ' + chalk.cyan('blog-spec validate') + ' - Valider votre spécification');

  process.exit(0);
}
