import { getRandomInt } from '@shared/helpers';
import random from 'random';

export class Randomizer<T> {
  public deck: Array<T>;
  public used: Set<number>;
  public maxUsed: number;

  constructor(deck: Array<T>, maxUsed = deck.length) {
    this.deck = this.shuffleArray(deck);
    this.used = new Set();
    this.maxUsed = maxUsed;
  }

  // Function to shuffle an array
  private shuffleArray(array: Array<T>) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      // Get a random index from 0 to i
      const j = random.int(0, i);
      // Swap elements at i and j
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  isEmpty() {
    return this.used.size === this.maxUsed;
  }

  get() {
    if (this.used.size === this.maxUsed) {
      console.warn('Used all elements');
      return null; // All items have been returned
    }

    let randomIndex: number;
    do {
      randomIndex = getRandomInt(this.deck.length);
    } while (this.used.has(randomIndex));

    this.used.add(randomIndex);

    return this.deck[randomIndex];
  }

  getUsed() {
    return Array.from(this.used.values()).map((idx) => this.deck[idx]);
  }

  getRemaining() {
    return this.deck.reduce((acc, value, idx) => {
      if (this.used.has(idx)) {
        return acc;
      }
      acc.push(value);
      return acc;
    }, new Array<T>());
  }

  all() {
    const items: Array<T> = [];

    let item: T | null;
    do {
      item = this.get();
      if (item) {
        items.push(item);
      }
    } while (item);

    return items;
  }
}
