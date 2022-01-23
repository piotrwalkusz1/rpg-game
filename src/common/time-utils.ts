import { add } from 'date-fns';

export namespace TimeUtils {
  export const durationToMiliseconds = (duration: Duration): number => {
    return add(0, duration).valueOf();
  };
}
