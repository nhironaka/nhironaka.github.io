export const assertNever = (arg: unknown) => {
  if (arg !== undefined) {
    throw new Error(`Unexpected value ${arg}`);
  }

  return;
};

export function coord(
  _strings: TemplateStringsArray,
  values: number[],
): string {
  return values.join(', ');
}
