export namespace ArrayUtils {
  export const filterNotNull = <T>(array: (T | undefined | null)[]): T[] =>
    array.filter((item): item is T => item !== undefined && item !== null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const filterInstanceOf = <T>(array: readonly unknown[], type: abstract new (...args: any[]) => T): T[] =>
    array.filter((item): item is T => item instanceof type);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const findFirstInstanceOf = <T>(array: readonly unknown[], type: abstract new (...args: any[]) => T): T | undefined =>
    array.find((item): item is T => item instanceof type);

  export const getShuffledArray = <T>(array: T[]) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[rand]] = [newArray[rand], newArray[i]];
    }
    return newArray;
  };

  export const remove = <T>(array: T[], item: T): boolean => {
    const index: number = array.findIndex((otherItem) => otherItem === item);
    if (index !== -1) {
      array.splice(index, 1);
      return true;
    }
    return false;
  };

  export const distinct = <T>(array: T[]): T[] => [...new Set(array)];
}
