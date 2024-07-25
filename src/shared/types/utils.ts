export type ConstValues<T extends { [key: string]: unknown }> = T[keyof T];
