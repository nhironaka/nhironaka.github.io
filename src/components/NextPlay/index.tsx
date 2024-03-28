import { GoalToken } from '@components/GoalToken';
import { Button } from '@components/ui/Button';
import { type GoalToken as GoalTokenType } from '@shared/types';

interface Props {
  disabled: boolean;
  nextPlay(): void;
  currentPlay: GoalTokenType;
}

export function NextPlay({ disabled, nextPlay, currentPlay }: Props) {
  return (
    <Button
      buttonStyle="text"
      onClick={() => {
        if (!disabled) {
          nextPlay();
        }
      }}
    >
      <GoalToken
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="8"
        height="10"
        token={currentPlay}
      />
    </Button>
  );
}
