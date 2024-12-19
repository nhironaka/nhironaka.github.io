import { Randomizer } from '@shared/services/randomizer';
import random from 'random';

import { PILE_RADIUS, TOKENS, TOKEN_SIZE } from '../constants/board';
import { placeRandomElementsInCircle } from '../helpers/placement';
import { type Pile, type PlayedToken, type Token } from '../types/board';

import { Player } from './player';

const PILE_SIZE = 4;

const DISCARD_RADIUS: Record<number, number> = {
  2: 150,
  3: 345 / 2,
  4: 364 / 2,
};

const NUM_PILES: Record<number, number> = {
  2: 5,
  3: 7,
  4: 9,
};

export class BoardState {
  discards: Array<PlayedToken>;
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
    const players = this.players.length;
    return [...new Array(NUM_PILES[players])].map(() => {
      const placements = placeRandomElementsInCircle({
        radius: PILE_RADIUS[players],
        elementWidth: TOKEN_SIZE[players],
        elementHeight: TOKEN_SIZE[players],
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

  returnTokens(params: { pile: Pile; selectedToken: Token }) {
    const {
      pile: { tokens, id },
      selectedToken,
    } = params;
    const players = this.players.length;
    const discardedTokens = placeRandomElementsInCircle({
      allowOverlap: true,
      radius: DISCARD_RADIUS[players],
      elements: tokens
        .filter(({ token }) => token !== selectedToken)
        .map(({ position: startingPosition, token }) => ({
          startingPosition,
          token,
          pileId: id,
        })),
      elementWidth: TOKEN_SIZE[players],
      elementHeight: TOKEN_SIZE[players],
      startingElements: this.discards,
    });
    this.discards.push(...discardedTokens);

    return {
      discardedTokens,
      tokensToPlay: tokens.filter(({ token }) => token === selectedToken),
    };
  }
}
