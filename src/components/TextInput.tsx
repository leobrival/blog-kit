import React, { useState } from 'react';
import { Box, Text } from 'ink';

interface TextInputProps {
  label: string;
  defaultValue?: string;
  onSubmit: (value: string) => void;
}

export function TextInput({ label, defaultValue = '', onSubmit }: TextInputProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <Box flexDirection="column">
      <Text>
        <Text color="cyan">{label}</Text>
        {defaultValue && <Text dimColor> ({defaultValue})</Text>}
      </Text>
      <Box marginTop={1}>
        <Text color="green">→ </Text>
        <Text>{value}</Text>
      </Box>
    </Box>
  );
}
