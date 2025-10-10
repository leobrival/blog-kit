import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import type { BlogSpec } from '../schemas/blog.schema';
import { DEFAULT_BLOCKS } from '../utils/default-blocks';
import { DEFAULT_AGENTS } from '../utils/default-agents';

interface InitFormProps {
  onSubmit: (spec: BlogSpec) => void;
}

const questions = [
  { key: 'name', label: 'Nom du blog', default: 'Mon Blog' },
  { key: 'context', label: 'Contexte (qui/quoi/pourquoi)', default: 'Blog tech pour fondateurs et devs.' },
  { key: 'objective', label: 'Objectif principal', default: 'Générer des leads qualifiés via du contenu expert.' },
  { key: 'tone', label: 'Tonalité (expert/pédagogique/convivial/corporate)', default: 'pédagogique' },
  { key: 'languages', label: 'Langues (séparées par des virgules)', default: 'fr' },
  { key: 'voice_do', label: 'Voice DO (séparées par ;)', default: 'Clair;Actionnable;Sources citées' },
  { key: 'voice_dont', label: 'Voice DON\'T (séparées par ;)', default: 'Jargon inutile;Promesses non vérifiées' },
  { key: 'topic', label: 'Sujet d\'article par défaut', default: 'Guide: lancer une extension Raycast connectée à Adonis v6' },
  { key: 'search_intent', label: 'Réponse à l\'intention de recherche (1 phrase)', default: 'Un tutoriel étape par étape avec code et pièges à éviter.' },
  { key: 'additional_info', label: 'Infos supplémentaires (optionnel)', default: '' },
  { key: 'info_avoid', label: 'Infos à éviter (optionnel)', default: '' },
];

export function InitForm({ onSubmit }: InitFormProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentValue, setCurrentValue] = useState('');

  const currentQuestion = questions[currentIndex];

  useInput((input, key) => {
    if (key.return) {
      const value = currentValue || currentQuestion?.default || '';
      const newAnswers = { ...answers, [currentQuestion?.key || '']: value };
      setAnswers(newAnswers);
      setCurrentValue('');

      if (currentIndex === questions.length - 1) {
        // Build spec and submit
        const spec: BlogSpec = {
          blog: {
            name: newAnswers.name,
            context: newAnswers.context,
            objective: newAnswers.objective,
            tone: newAnswers.tone as any,
            languages: newAnswers.languages.split(',').map((l) => l.trim()).filter(Boolean),
            brand_rules: {
              voice_do: newAnswers.voice_do.split(';').map((s) => s.trim()).filter(Boolean),
              voice_dont: newAnswers.voice_dont.split(';').map((s) => s.trim()).filter(Boolean),
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
            topic: newAnswers.topic,
            search_intent_response: newAnswers.search_intent,
            additional_information: newAnswers.additional_info,
            information_to_avoid: newAnswers.info_avoid,
          },
        };
        onSubmit(spec);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else if (key.backspace || key.delete) {
      setCurrentValue(currentValue.slice(0, -1));
    } else if (!key.ctrl && !key.meta && input) {
      setCurrentValue(currentValue + input);
    }
  });

  if (!currentQuestion) return null;

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text color="gray">
          Question {currentIndex + 1}/{questions.length}
        </Text>
      </Box>
      <Box marginBottom={1}>
        <Text color="cyan">{currentQuestion.label}</Text>
        {currentQuestion.default && (
          <Text dimColor> ({currentQuestion.default})</Text>
        )}
      </Box>
      <Box>
        <Text color="green">→ </Text>
        <Text>{currentValue || currentQuestion.default}</Text>
        <Text color="gray">▊</Text>
      </Box>
    </Box>
  );
}
