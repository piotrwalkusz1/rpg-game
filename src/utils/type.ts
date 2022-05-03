// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Type<T> = abstract new (...args: any[]) => T;
