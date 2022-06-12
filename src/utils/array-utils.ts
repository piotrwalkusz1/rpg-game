import type { Type } from './type';

export namespace ArrayUtils {
  export const mapAndFilterNotNull = <T, R>(array: readonly T[], map: (item: T) => R | undefined | null): R[] => {
    const result: (R | undefined | null)[] = array.map(map);
    return filterNotNull(result);
  };

  export const filterNotNull = <T>(array: (T | undefined | null)[]): T[] =>
    array.filter((item): item is T => item !== undefined && item !== null);

  export const filterInstanceOf = <T>(array: readonly unknown[], type: Type<T>): T[] =>
    array.filter((item): item is T => item instanceof type);

  export const findFirstInstanceOf = <T>(array: readonly unknown[], type: Type<T>): T | undefined =>
    array.find((item): item is T => item instanceof type);

  export const removeFirst = <T>(array: T[], item: T): boolean => {
    const index: number = array.findIndex((otherItem) => otherItem === item);
    if (index !== -1) {
      array.splice(index, 1);
      return true;
    }
    return false;
  };

  export const distinct = <T>(array: T[]): T[] => [...new Set(array)];
}

export const notEmpty = <T>(array: T[] | undefined | null): array is T[] => Array.isArray(array) && array.length > 0;
