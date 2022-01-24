import { addMilliseconds, differenceInMilliseconds } from 'date-fns';
import { add } from 'date-fns';

export namespace TimeUtils {
  export const durationToMiliseconds = (duration: Duration): number => {
    return add(0, duration).valueOf();
  };

  export const interpolate = (start: Date, end: Date, ratio: number): Date => {
    return addMilliseconds(start, ratio * differenceInMilliseconds(end, start));
  };
}
