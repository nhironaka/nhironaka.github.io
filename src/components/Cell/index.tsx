import { CellState } from '@services/CellState';
import { Box } from '@styles/jsx';

interface Props {
  cell: CellState;
}

export function Cell({ cell }: Props) {
  return (
    <Box width="100%" bg="bg.body" borderRadius="md" position="relative" p="px">
      <Box marginTop="100%" />
      <Box
        width="100%"
        height="100%"
        top="0"
        left="0"
        bg="bg.hover"
        borderRadius="md"
        position="absolute"
      />
    </Box>
  );
}
