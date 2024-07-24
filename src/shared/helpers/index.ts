export const assertNever = (arg: unknown) => {
  if (arg !== undefined) {
    throw new Error(`Unexpected value ${arg}`);
  }

  return;
};
