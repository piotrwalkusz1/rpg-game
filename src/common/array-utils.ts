export namespace ArrayUtils {
  export const filterNotNull = <T>(array: (T | undefined | null)[]): T[] =>
    array.filter((item): item is T => item !== undefined && item !== null);

  export const filterInstanceOf = <T>(array: unknown[], type: abstract new () => T): T[] =>
    array.filter((item): item is T => item instanceof type);

  export const getShuffledArray = <T>(array: T[]) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[rand]] = [newArray[rand], newArray[i]];
    }
    return newArray;
  };
}
