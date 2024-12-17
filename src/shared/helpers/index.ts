import random from 'random';

export const assertNever = (arg: unknown) => {
  if (arg !== undefined) {
    throw new Error(`Unexpected value ${arg}`);
  }

  return;
};
export const getRandomInt = (max: number, min = 0) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return random.int(minCeiled, maxFloored);
};
