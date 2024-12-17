import { Randomizer } from '@shared/services/randomizer';
import random from 'random';
import { PILE_RADIUS, TOKEN_SIZE, TOKENS } from '../constants/board';
import {
  placeRandomElementsInCircle,
  PositionedElements,
} from '../helpers/placement';
import { Pile, Position, Token } from '../types/board';
import { Player } from './player';

const PILE_SIZE = 4;

const DISCARD_RADIUS = 150;

const NUM_PILES: Record<number, number> = {
  2: 5,
  3: 7,
  4: 9,
};

export class BoardState {
  discards: Array<
    PositionedElements & {
      token: Token;
    }
  >;
  players: Array<Player>;
  piles: Array<Pile>;
  randomizer: Randomizer<Token>;

  constructor(players = 2) {
    this.players = Array.from(
      { length: players },
      (_, i) => new Player(`Player ${i + 1}`),
    );
    const deck = Object.values(TOKENS).flatMap((token) =>
      new Array(20).fill(token),
    );
    this.randomizer = new Randomizer(deck);
    this.discards = [];

    this.piles = this.shuffleTokens();
  }

  shuffleTokens(): Array<Pile> {
    return [...new Array(NUM_PILES[this.players.length])].map(() => {
      const placements = placeRandomElementsInCircle({
        radius: PILE_RADIUS,
        elementWidth: TOKEN_SIZE,
        elementHeight: TOKEN_SIZE,
        elements: Array.from({ length: PILE_SIZE }, () => ({
          token: this.getToken(),
        })),
      });

      return {
        id: String(random.float()),
        tokens: placements,
      };
    });
  }

  getToken(): Token {
    let token: Token | null = null;

    while (!token && !this.randomizer.isEmpty()) {
      token = this.randomizer.get();
    }

    if (token) {
      return token;
    }

    this.randomizer = new Randomizer(
      this.discards
        .map(({ token }) => token)
        .concat(this.randomizer.getRemaining()),
    );
    this.discards = [];

    return this.getToken();
  }

  returnTokens(params: {
    discardTokens: Pile['tokens'];
    selectedToken: Token;
    activePlayer: number;
  }) {
    const { discardTokens } = params;
    const discardedTokens = placeRandomElementsInCircle<{
      startingPosition: Position;
      token: Token;
    }>({
      allowOverlap: true,
      radius: DISCARD_RADIUS,
      elements: discardTokens.map(({ position: startingPosition, token }) => ({
        startingPosition,
        token,
      })),
      elementWidth: TOKEN_SIZE,
      elementHeight: TOKEN_SIZE,
      startingElements: this.discards,
    });
    this.discards.push(...discardedTokens);

    return discardedTokens;
  }
}