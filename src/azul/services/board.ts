import { Randomizer } from '@shared/services/randomizer';
import random from 'random';

import { NUM_PILES, PILE_SIZE, TOKENS } from '../constants/board';
import {
  getCoasterSize,
  placeRandomElementsInCircle,
} from '../helpers/placement';
import { type Pile, type PlayedToken, type Token } from '../types/board';

import { Player } from './player';

const TOKEN_COUNT = 4;

const DISCARD_RADIUS: Record<number, number> = {
  2: 150,
  3: 345 / 2,
  4: 364 / 2,
};

export class BoardState {
  discards = new Array<PlayedToken>();
  players = new Array<Player>();
  piles = new Array<Pile>();
  randomizer: Randomizer<Token>;
  activePlayer = 0;

  constructor(players = 2) {
    this.players = Array.from(
      { length: players },
      (_, i) => new Player(`Player ${i + 1}`),
    );
    const deck = Object.values(TOKENS).flatMap((token) =>
      new Array(20).fill(token),
    );
    this.randomizer = new Randomizer(deck);

    this.shuffleTokens();
  }

  shuffleTokens() {
    const players = this.players.length;
    const coasterSize = getCoasterSize({
      n: NUM_PILES[players],
      radius: PILE_SIZE / 2,
    });

    const size = Math.floor(coasterSize / 4);
    this.piles = [...new Array(NUM_PILES[players])].map((_, idx) => {
      const hasTokens = this.piles[idx]?.tokens?.length;
      const placements = placeRandomElementsInCircle({
        radius: Math.floor(coasterSize / 2),
        elementWidth: size,
        elementHeight: size,
        elements: hasTokens
          ? this.piles[idx].tokens
          : Array.from({ length: TOKEN_COUNT }, () => ({
              token: this.getToken(),
              width: size,
              height: size,
            })),
      });

      return {
        id: this.piles[idx]?.id ?? String(idx ? random.float() : 0),
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
      elementWidth: tokens[0].width,
      elementHeight: tokens[0].height,
      startingElements: this.discards,
    });
    this.discards.push(...discardedTokens);

    return {
      discardedTokens,
      tokensToPlay: tokens.filter(({ token }) => token === selectedToken),
    };
  }

  finishTurn(pileId: string) {
    this.piles = this.piles.map((pile) => {
      if (pile.id === pileId) {
        return {
          ...pile,
          tokens: [],
        };
      }
      return pile;
    });

    this.activePlayer = (this.activePlayer + 1) % this.players.length;
  }
}
