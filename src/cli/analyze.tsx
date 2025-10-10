import React from 'react';
import { render, Box, Text } from 'ink';
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, extname } from 'path';
import type { BlogSpec } from '../schemas/blog.schema';
import { DEFAULT_AGENTS } from '../utils/default-agents';
import { DEFAULT_BLOCKS } from '../utils/default-blocks';
import { slugify } from '../utils/slugify';
import gradient from 'gradient-string';

interface AnalysisResult {
  fileCount: number;
  markdownFiles: number;
  topics: string[];
  commonKeywords: string[];
  suggestedTone: 'expert' | 'pédagogique' | 'convivial' | 'corporate';
  suggestedContext: string;
  suggestedObjective: string;
}

export async function analyzeCommand(directory: string = process.cwd()) {
  render(
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold>{gradient.pastel.multiline('🔍 Analyse du contenu')}</Text>
      </Box>
      <Text dimColor>Répertoire: {directory}</Text>
      <Box marginBottom={1}>
        <Text color="gray">{'─'.repeat(60)}</Text>
      </Box>
    </Box>
  );

  try {
    // 1. Check if spec already exists
    const specPath = join(directory, '.spec', 'blog.spec.json');
    if (existsSync(specPath)) {
      render(
        <Box flexDirection="column" padding={1}>
          <Text color="yellow">⚠️  Une spécification existe déjà: {specPath}</Text>
          <Text dimColor>Utilisez `blog-spec init` pour la reconfigurer.</Text>
        </Box>
      );
      setTimeout(() => process.exit(0), 100);
      return;
    }

    // 2. Analyze directory content
    console.log('\n🔍 Analyse du contenu en cours...\n');
    const analysis = analyzeDirectory(directory);

    // 3. Display analysis results
    render(
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Text bold color="cyan">📊 Résultats de l\'analyse</Text>
        </Box>
        <Box flexDirection="column" marginLeft={2}>
          <Text>• Fichiers trouvés: {analysis.fileCount}</Text>
          <Text>• Fichiers Markdown: {analysis.markdownFiles}</Text>
          <Text>• Sujets identifiés: {analysis.topics.length}</Text>
          {analysis.topics.length > 0 && (
            <Box marginLeft={2} flexDirection="column">
              {analysis.topics.slice(0, 5).map((topic, i) => (
                <Text key={i} dimColor>- {topic}</Text>
              ))}
            </Box>
          )}
          <Text>• Keywords fréquents: {analysis.commonKeywords.slice(0, 5).join(', ')}</Text>
          <Text>• Ton suggéré: {analysis.suggestedTone}</Text>
        </Box>
      </Box>
    );

    // 4. Generate constitution
    console.log('\n📝 Génération de la constitution...\n');
    const spec = generateSpecFromAnalysis(analysis, directory);

    // 5. Write spec file
    const specDir = join(directory, '.spec');
    mkdirSync(specDir, { recursive: true });
    writeFileSync(specPath, JSON.stringify(spec, null, 2), 'utf-8');

    // 6. Generate Claude.md
    const blogDir = join(directory, 'content', slugify(spec.blog.name));
    mkdirSync(blogDir, { recursive: true });
    const claudeMd = generateClaudeMd(spec);
    const claudePath = join(blogDir, 'Claude.md');
    writeFileSync(claudePath, claudeMd, 'utf-8');

    // 7. Display success
    render(
      <Box flexDirection="column" padding={1}>
        <Box marginTop={1} marginBottom={1}>
          <Text color="gray">{'─'.repeat(60)}</Text>
        </Box>
        <Box marginBottom={1}>
          <Text bold color="green">✅ Constitution générée avec succès!</Text>
        </Box>
        <Box flexDirection="column" marginLeft={2}>
          <Text>📄 Spécification: <Text color="cyan">{specPath}</Text></Text>
          <Text>📋 Brief agents: <Text color="cyan">{claudePath}</Text></Text>
        </Box>
        <Box marginTop={2} flexDirection="column">
          <Text bold>Analyse:</Text>
          <Box marginLeft={2} flexDirection="column">
            <Text>• Contexte détecté: {analysis.suggestedContext}</Text>
            <Text>• Objectif suggéré: {analysis.suggestedObjective}</Text>
            <Text>• Ton: {analysis.suggestedTone}</Text>
          </Box>
        </Box>
        <Box marginTop={2} flexDirection="column">
          <Text bold>Prochaines étapes:</Text>
          <Box marginLeft={2} flexDirection="column">
            <Text>1. Vérifier et ajuster la constitution: <Text color="cyan">{specPath}</Text></Text>
            <Text>2. Exécuter <Text color="cyan">blog-spec validate</Text> pour valider</Text>
            <Text>3. Exécuter <Text color="cyan">blog-spec generate</Text> pour créer structure</Text>
            <Text>4. Lancer <Text color="cyan">blog-spec article "Sujet"</Text> pour générer contenu</Text>
          </Box>
        </Box>
      </Box>
    );

    setTimeout(() => process.exit(0), 100);
  } catch (error) {
    render(
      <Box flexDirection="column" padding={1}>
        <Text color="red">❌ Erreur: {(error as Error).message}</Text>
      </Box>
    );
    setTimeout(() => process.exit(1), 100);
  }
}

function analyzeDirectory(directory: string): AnalysisResult {
  const analysis: AnalysisResult = {
    fileCount: 0,
    markdownFiles: 0,
    topics: [],
    commonKeywords: [],
    suggestedTone: 'pédagogique',
    suggestedContext: '',
    suggestedObjective: '',
  };

  const allContent: string[] = [];
  const topicSet = new Set<string>();

  function scanDirectory(dir: string) {
    try {
      const items = readdirSync(dir);

      for (const item of items) {
        // Skip node_modules, .git, dist, etc.
        if (['node_modules', '.git', 'dist', '.next', 'build'].includes(item)) {
          continue;
        }

        const fullPath = join(dir, item);
        const stats = statSync(fullPath);

        if (stats.isDirectory()) {
          scanDirectory(fullPath);
        } else if (stats.isFile()) {
          analysis.fileCount++;

          if (extname(item) === '.md') {
            analysis.markdownFiles++;
            try {
              const content = readFileSync(fullPath, 'utf-8');
              allContent.push(content);

              // Extract title from markdown
              const titleMatch = content.match(/^#\s+(.+)$/m);
              if (titleMatch) {
                topicSet.add(titleMatch[1].trim());
              }

              // Extract frontmatter title
              const frontmatterMatch = content.match(/^---\n[\s\S]*?title:\s*["']?(.+?)["']?\n[\s\S]*?---/);
              if (frontmatterMatch) {
                topicSet.add(frontmatterMatch[1].trim());
              }
            } catch (error) {
              // Skip files that can't be read
            }
          }
        }
      }
    } catch (error) {
      // Skip directories that can't be read
    }
  }

  scanDirectory(directory);

  analysis.topics = Array.from(topicSet);

  // Analyze content for keywords
  if (allContent.length > 0) {
    const combinedContent = allContent.join(' ').toLowerCase();
    const keywords = extractKeywords(combinedContent);
    analysis.commonKeywords = keywords.slice(0, 10);

    // Detect tone
    analysis.suggestedTone = detectTone(combinedContent, keywords);

    // Generate context and objective
    analysis.suggestedContext = generateContext(keywords, analysis.topics.length);
    analysis.suggestedObjective = generateObjective(keywords);
  }

  return analysis;
}

function extractKeywords(content: string): string[] {
  // Remove markdown syntax
  const cleaned = content
    .replace(/[#*_`\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase();

  // Common stop words to filter out
  const stopWords = new Set([
    'le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'ou', 'mais', 'pour',
    'dans', 'par', 'sur', 'avec', 'sans', 'à', 'au', 'aux', 'ce', 'cette', 'ces',
    'son', 'sa', 'ses', 'leur', 'leurs', 'nous', 'vous', 'ils', 'elles', 'que',
    'qui', 'quoi', 'dont', 'où', 'est', 'sont', 'être', 'avoir', 'faire', 'plus',
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
    'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could',
  ]);

  // Extract words
  const words = cleaned.split(/\s+/).filter(word =>
    word.length > 3 && !stopWords.has(word) && /^[a-zàâäéèêëïîôùûüÿç]+$/.test(word)
  );

  // Count frequency
  const frequency = new Map<string, number>();
  words.forEach(word => {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  });

  // Sort by frequency
  return Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word);
}

function detectTone(content: string, keywords: string[]): 'expert' | 'pédagogique' | 'convivial' | 'corporate' {
  // Technical/expert indicators
  const expertIndicators = ['architecture', 'performance', 'optimization', 'scalability', 'implementation', 'technical', 'advanced'];
  const expertScore = expertIndicators.filter(word => content.includes(word)).length;

  // Pedagogical indicators
  const pedagogicalIndicators = ['guide', 'tutorial', 'apprendre', 'comprendre', 'exemple', 'étape', 'débutant', 'comment'];
  const pedagogicalScore = pedagogicalIndicators.filter(word => content.includes(word)).length;

  // Friendly indicators
  const friendlyIndicators = ['facile', 'simple', 'rapide', 'astuce', 'conseil', 'découvrir', 'essayer'];
  const friendlyScore = friendlyIndicators.filter(word => content.includes(word)).length;

  // Corporate indicators
  const corporateIndicators = ['entreprise', 'business', 'stratégie', 'roi', 'efficacité', 'productivité', 'solution'];
  const corporateScore = corporateIndicators.filter(word => content.includes(word)).length;

  const scores = [
    { tone: 'expert' as const, score: expertScore },
    { tone: 'pédagogique' as const, score: pedagogicalScore },
    { tone: 'convivial' as const, score: friendlyScore },
    { tone: 'corporate' as const, score: corporateScore },
  ];

  scores.sort((a, b) => b.score - a.score);

  return scores[0].score > 0 ? scores[0].tone : 'pédagogique';
}

function generateContext(keywords: string[], topicCount: number): string {
  const hasCode = keywords.some(k => ['code', 'développement', 'programming', 'typescript', 'javascript'].includes(k));
  const hasBusiness = keywords.some(k => ['business', 'entreprise', 'stratégie', 'marketing'].includes(k));

  if (hasCode && hasBusiness) {
    return 'Blog tech pour développeurs et entrepreneurs';
  } else if (hasCode) {
    return `Blog technique avec focus sur le développement${topicCount > 5 ? ' et les best practices' : ''}`;
  } else if (hasBusiness) {
    return 'Blog business et stratégie digitale';
  }

  return 'Blog de contenu technique et informatif';
}

function generateObjective(keywords: string[]): string {
  const hasEducation = keywords.some(k => ['guide', 'tutorial', 'apprendre', 'formation'].includes(k));
  const hasExpertise = keywords.some(k => ['expert', 'advanced', 'professionnel'].includes(k));

  if (hasEducation) {
    return 'Éduquer et accompagner les lecteurs avec des guides pratiques';
  } else if (hasExpertise) {
    return 'Partager expertise technique et positionner comme référence';
  }

  return 'Générer du trafic qualifié via du contenu de qualité';
}

function generateSpecFromAnalysis(analysis: AnalysisResult, directory: string): BlogSpec {
  const blogName = directory.split('/').pop() || 'Mon Blog';

  return {
    blog: {
      name: blogName.charAt(0).toUpperCase() + blogName.slice(1),
      context: analysis.suggestedContext,
      objective: analysis.suggestedObjective,
      tone: analysis.suggestedTone,
      languages: ['fr'],
      brand_rules: {
        voice_do: [
          'Clair et concis',
          'Basé sur des sources fiables',
          'Exemples pratiques',
          'Actionnable',
        ],
        voice_dont: [
          'Jargon sans explication',
          'Claims non vérifiés',
          'Contenu superficiel',
          'Promesses exagérées',
        ],
      },
    },
    workflow: {
      agents: DEFAULT_AGENTS,
      review_rules: {
        must_have: [
          'Sommaire clair',
          'Sources externes citées',
          'FAQ basée sur PAA',
          'Exemples concrets',
        ],
        must_avoid: [
          'Claims non sourcés',
          'Keyword stuffing',
          'Contenu dupliqué',
        ],
      },
    },
    content_model: {
      blocks: DEFAULT_BLOCKS,
    },
    article_template: {
      topic: analysis.topics[0] || 'Guide pratique',
      search_intent_response: 'Un guide complet et actionnable',
      additional_information: `Analyse automatique: ${analysis.markdownFiles} fichiers markdown trouvés, ${analysis.topics.length} sujets identifiés`,
      information_to_avoid: '',
    },
  };
}

function generateClaudeMd(spec: BlogSpec): string {
  return `# Ligne éditoriale – ${spec.blog.name}

*Constitution générée automatiquement par analyse du contenu existant*

## Contexte
${spec.blog.context}

${spec.article_template.additional_information}

## Objectif
${spec.blog.objective}

## Ton
${spec.blog.tone}

## Règles de marque

**Do:**
${spec.blog.brand_rules.voice_do.map(rule => `- ${rule}`).join('\n')}

**Don't:**
${spec.blog.brand_rules.voice_dont.map(rule => `- ${rule}`).join('\n')}

## Workflow multi-agents

${spec.workflow.agents.map(agent => {
  return `### ${agent.id}
**Rôle**: ${agent.role}
**Goals**: ${agent.goals.join(', ')}
${agent.guardrails ? `**Guardrails**: ${agent.guardrails.join(', ')}` : ''}`;
}).join('\n\n')}

## Review rules

**Must-have:**
${spec.workflow.review_rules.must_have.map(rule => `- ${rule}`).join('\n')}

**Must-avoid:**
${spec.workflow.review_rules.must_avoid.map(rule => `- ${rule}`).join('\n')}

## Modèle de contenu

**Blocs activés:**
${spec.content_model.blocks.filter(b => b.active).map(block => `- **${block.type}**: ${block.description}${block.required ? ' *(requis)*' : ''}`).join('\n')}

---

*Cette constitution a été générée automatiquement. Vous pouvez la modifier dans `.spec/blog.spec.json` et régénérer ce fichier avec \`blog-spec generate\`.*
`;
}
