// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Type<T> = abstract new (...args: any[]) => T;

export const requireType = <T>(value: unknown, type: Type<T>): T => {
  if (value instanceof type) {
    return value;
  }
  throw new Error(`Expected type "${type.name}" but was ${typeName(value)}`);
};

export const requireNumber = (value: unknown): number => {
  if (typeof value === 'number') {
    return value;
  }
  throw new Error(`Expected "number" but was ${typeName(value)}`);
};

export const requireNotNull = <T>(value: T | null | undefined): T => {
  if (value !== null && value !== undefined) {
    return value;
  }
  throw new Error(`Expected not null but was ${typeName(value)}`);
};

export const typeName = (value: unknown): string => {
  if (typeof value === 'object' && value !== null) {
    return value.constructor.name;
  }
  return typeof value;
};
