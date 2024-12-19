import { Button } from '@ui/Button';

import { type GoalToken as GoalTokenType } from '../../types/board';
import { GoalToken } from '../GoalToken';

interface Props {
  nextPlay(): void;
  currentPlay: GoalTokenType;
}

export function NextPlay({ nextPlay, currentPlay }: Props) {
  return (
    <Button buttonStyle="text" color="neutral.900" onClick={nextPlay}>
      <GoalToken
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="10"
        height="10"
        token={currentPlay}
      />
    </Button>
  );
}
