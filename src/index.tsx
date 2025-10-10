#!/usr/bin/env node
import { Command } from 'commander';
import { initCommandSimple } from './cli/init-simple';
import { generateCommand } from './cli/generate';
import { validateCommand } from './cli/validate';
import { checkCommand } from './cli/check';
import { articleCommand } from './cli/article';
import { analyzeCommand } from './cli/analyze';

const program = new Command();

program
  .name('blog-spec')
  .description('CLI pour génération d\'articles de blog optimisés par IA avec spec-driven development')
  .version('0.1.0');

program
  .command('init')
  .description('Initialiser un nouveau blog avec questionnaire interactif')
  .action(async () => {
    await initCommandSimple();
  });

program
  .command('generate')
  .description('Générer la structure Markdown depuis .spec/blog.spec.json')
  .action(async () => {
    await generateCommand();
  });

program
  .command('validate')
  .description('Valider la spécification blog contre le schéma')
  .action(async () => {
    await validateCommand();
  });

program
  .command('check')
  .description('Vérifier les outils disponibles (AI agents, Git, etc.)')
  .action(async () => {
    await checkCommand();
  });

program
  .command('article <topic>')
  .description('Workflow complet: research → seo → marketing')
  .option('-a, --agents <agents>', 'Agents à exécuter (comma-separated: research,seo,marketing)', 'all')
  .action(async (topic: string, options: { agents: string }) => {
    await articleCommand({ topic, agents: options.agents });
  });

program
  .command('analyze [directory]')
  .description('Analyser le contenu d\'un dossier pour générer automatiquement la constitution')
  .action(async (directory?: string) => {
    await analyzeCommand(directory);
  });

program.parse();
