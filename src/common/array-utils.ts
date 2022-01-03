export namespace ArrayUtils {
  export const filterNotNull = <T extends {}>(array: (T | undefined | null)[]): T[] =>
    array.filter((item): item is T => item !== undefined && item !== null);
}
