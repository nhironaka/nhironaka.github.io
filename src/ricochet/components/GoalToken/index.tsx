import {
  BellIcon,
  BoltIcon,
  BugAntIcon,
  BuildingLibraryIcon,
  CakeIcon,
  FilmIcon,
  GifIcon,
  GlobeAsiaAustraliaIcon,
  KeyIcon,
  LifebuoyIcon,
  LightBulbIcon,
  PuzzlePieceIcon,
  RadioIcon,
  RocketLaunchIcon,
  StarIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { type ComponentProps } from 'react';

import { GOAL_TOKENS } from '../../constants/board';
import { Token } from '../Token';

const goalTokenBrand = {
  [GOAL_TOKENS.RED_1]: BellIcon,
  [GOAL_TOKENS.RED_2]: LightBulbIcon,
  [GOAL_TOKENS.RED_3]: BoltIcon,
  [GOAL_TOKENS.RED_4]: BugAntIcon,
  [GOAL_TOKENS.YELLOW_1]: BuildingLibraryIcon,
  [GOAL_TOKENS.YELLOW_2]: TrophyIcon,
  [GOAL_TOKENS.YELLOW_3]: StarIcon,
  [GOAL_TOKENS.YELLOW_4]: RocketLaunchIcon,
  [GOAL_TOKENS.PURPLE_1]: RadioIcon,
  [GOAL_TOKENS.PURPLE_2]: PuzzlePieceIcon,
  [GOAL_TOKENS.PURPLE_3]: LifebuoyIcon,
  [GOAL_TOKENS.PURPLE_4]: GlobeAsiaAustraliaIcon,
  [GOAL_TOKENS.GREEN_1]: GifIcon,
  [GOAL_TOKENS.GREEN_2]: FilmIcon,
  [GOAL_TOKENS.GREEN_3]: CakeIcon,
  [GOAL_TOKENS.GREEN_4]: KeyIcon,
};

export function GoalToken({ token, ...rest }: ComponentProps<typeof Token>) {
  const Icon = goalTokenBrand[token];
  return (
    <Token token={token} {...rest}>
      <Icon className="token-icon" />
    </Token>
  );
}
