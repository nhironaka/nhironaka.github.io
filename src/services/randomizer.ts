export class Randomizer<T> {
  private deck: Array<T>;
  private used: Set<number>;
  private maxUsed: number;

  constructor(deck: Array<T>, maxUsed = deck.length) {
    this.deck = deck;
    this.used = new Set();
    this.maxUsed = maxUsed;
  }

  get() {
    if (this.used.size === this.maxUsed) {
      return null; // All items have been returned
    }

    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * (this.deck.length + 1));
    } while (this.used.has(randomIndex));

    this.used.add(randomIndex);

    return this.deck[randomIndex];
  }

  all() {
    const items = new Array<T>();

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
